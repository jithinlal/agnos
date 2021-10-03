import {
	findItemById,
	findItems,
	paginateItems,
} from '~/data-layer/mongoose/item.data-layer';
import { IItem } from '~/interfaces/item.interface';
import { ITax } from '~/interfaces/tax.interface';
import { paginateItemFactory } from '~/data-layer/mongoose/factory/item.factory';
import { findOneBundle } from '~/data-layer/mongoose/bundle.data-layer';
import { IBundleItem } from '~/interfaces/bundle-item.interface';
import { OrderDto } from '~/dtos/order.dto';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import { createOrderItem } from '~/data-layer/mongoose/order-item.data-layer';
import { createOrder } from '~/data-layer/mongoose/order.data-layer';
import { IOrder } from '~/interfaces/order.interface';
import { orderQueue } from '~/queues/order.queue';
import { ORDER_STATUS } from '~/enums/order-status.enum';

class ItemService {
	public async getItems(
		search: string | undefined,
		limit: number | undefined,
		page: number | undefined
	) {
		const { query, options } = paginateItemFactory(search, limit, page);

		const items = await paginateItems({
			query,
			options,
		});

		// calculates the total price based on price and tax and then add that on to the item object
		const finalItemDocs = items.docs.map((item: IItem) => {
			const total = (
				item.price +
				(item.price * (item.tax as ITax).tax) / 100
			).toFixed(2);

			return {
				...item,
				...{ total },
			};
		});

		return {
			...items,
			...{ docs: finalItemDocs },
		};
	}

	public async addToCart(cartItems: OrderDto): Promise<string> {
		const totalCost = await this._findTotalCost(cartItems);
		return totalCost.toFixed(2);
	}

	private async _findTotalCost(cartItems: OrderDto): Promise<number> {
		// create a mapping of the order items
		const itemMapping: any = {};
		for (let i = 0; i < cartItems.orderItems.length; i++) {
			const orderItem = cartItems.orderItems[i];
			itemMapping[orderItem.item] = orderItem.quantity;
		}

		const items = Object.keys(itemMapping);

		if (items.length === 0) {
			return 0;
		}

		// if there is only 1 item, simply returns it's price it doesn't belong to any bundle
		if (items.length === 1) {
			const item = await findItemById(items[0], {
				populateArgs: [{ path: 'tax' }],
			});
			if (item) {
				return (
					(item.price *
						itemMapping[items[0]] *
						((item.tax as ITax).tax + 100)) /
					100
				);
			}
		}

		// check if the items create any bundle
		const bundle = await findOneBundle({
			args: {
				items: { $in: items },
				itemCount: items.length,
			},
			populateArgs: [
				{
					path: 'bundleItems',
					populate: [{ path: 'item', populate: [{ path: 'tax' }] }],
				},
			],
		});

		// if not then calculate the price for each individual items
		if (!bundle) {
			return await this._nonBundleCartTotal(items, itemMapping);
		}

		// if it constitutes a bundle then check if the quantity also matches
		// for eg: 2 burger and a coffee etc.
		let bundleMapping: any = {};
		for (let i = 0; i < bundle.bundleItems.length; i++) {
			const bundleItem = bundle.bundleItems[i] as IBundleItem;
			bundleMapping[(bundleItem.item as IItem)._id] = bundleItem.quantity;
		}

		// if the order is above a bundle then after the bundle discount is added
		// we need to also calculate the left over pricing treating the
		// leftovers as individual items
		let leftOverMapping: any = {};
		for (let i = 0; i < cartItems.orderItems.length; i++) {
			const orderItem = cartItems.orderItems[i];
			if (bundleMapping[orderItem.item] > itemMapping[orderItem.item]) {
				return await this._nonBundleCartTotal(items, itemMapping);
			} else if (bundleMapping[orderItem.item] < itemMapping[orderItem.item]) {
				leftOverMapping[orderItem.item] =
					itemMapping[orderItem.item] - bundleMapping[orderItem.item];
			}
		}

		// bundle price is being calculated
		let cartTotal = 0;
		(bundle.bundleItems as IBundleItem[]).forEach((bundleItem: IBundleItem) => {
			let price = (bundleItem.item as IItem).price;
			let tax = ((bundleItem.item as IItem).tax as ITax).tax;
			let discount = bundleItem.discount;

			const discountedPrice = price - (price * discount) / 100;
			cartTotal += discountedPrice + (discountedPrice * tax) / 100;
		});

		// leftover price is being calculated
		let leftOverItems = Object.keys(leftOverMapping);
		for (let i = 0; i < leftOverItems.length; i++) {
			const leftOverItem = leftOverItems[i];
			const item = await findItemById(leftOverItem, {
				populateArgs: [{ path: 'tax' }],
			});
			if (item) {
				cartTotal +=
					(item.price *
						leftOverMapping[leftOverItem] *
						((item.tax as ITax).tax + 100)) /
					100;
			}
		}

		return cartTotal;
	}

	private async _nonBundleCartTotal(items: string[], itemMapping: any) {
		const cartItems = await findItems({
			args: { _id: { $in: items } },
			populateArgs: [{ path: 'tax' }],
		});
		if (cartItems.length === 0) {
			return 0;
		}

		let cartTotal = 0;
		cartItems.forEach((cartItem: IItem) => {
			cartTotal +=
				(cartItem.price *
					itemMapping[cartItem._id.toString()] *
					((cartItem.tax as ITax).tax + 100)) /
				100;
		});

		return cartTotal;
	}

	public async createOrder(
		orderData: OrderDto,
		userId: string
	): Promise<IOrder> {
		if (isEmpty(orderData)) {
			throw new HttpException(400, 'No valid order data found');
		}

		const totalPrice = await this._findTotalCost(orderData);

		/**
		 * TODO => payment integration
		 */

		let orderItems: string[] = [];
		for (let i = 0; i < orderData.orderItems.length; i++) {
			const orderItem = orderData.orderItems[i];
			const createdOrderItem = await createOrderItem({
				args: {
					item: orderItem.item,
					quantity: orderItem.quantity,
				},
			});
			orderItems.push(createdOrderItem._id);
		}

		const order = await createOrder({
			args: {
				totalPrice: totalPrice.toFixed(2),
				orderItems,
				createdBy: userId,
			},
		});

		// order is pushed to a queue, and upon verification and satisfaction
		// a notification will be sent to the customer
		orderQueue.add({ orderStatus: ORDER_STATUS.PENDING, id: order._id });

		return order;
	}
}

export default ItemService;
