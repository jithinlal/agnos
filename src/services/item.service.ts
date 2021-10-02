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
		const itemMapping: any = {};
		for (let i = 0; i < cartItems.orderItems.length; i++) {
			const orderItem = cartItems.orderItems[i];
			itemMapping[orderItem.item] = orderItem.quantity;
		}

		const items = Object.keys(itemMapping);

		if (items.length === 0) {
			return 0;
		}

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

		if (!bundle) {
			return await this._nonBundleCartTotal(items, itemMapping);
		}

		let bundleMapping: any = {};
		for (let i = 0; i < bundle.bundleItems.length; i++) {
			const bundleItem = bundle.bundleItems[i] as IBundleItem;
			bundleMapping[(bundleItem.item as IItem)._id] = bundleItem.quantity;
		}

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

		let cartTotal = 0;
		(bundle.bundleItems as IBundleItem[]).forEach((bundleItem: IBundleItem) => {
			let price = (bundleItem.item as IItem).price;
			let tax = ((bundleItem.item as IItem).tax as ITax).tax;
			let discount = bundleItem.discount;

			const discountedPrice = price - (price * discount) / 100;
			cartTotal += discountedPrice + (discountedPrice * tax) / 100;
		});

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

		orderQueue.add({ orderStatus: ORDER_STATUS.PENDING, id: order._id });

		return order;
	}
}

export default ItemService;
