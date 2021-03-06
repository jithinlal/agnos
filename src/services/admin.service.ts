import { FoodTypeDto } from '~/dtos/food-type.dto';
import { IFoodType } from '~/interfaces/food-type.interface';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import {
	createFoodType,
	deleteOneFoodType,
} from '~/data-layer/mongoose/food-type.data-layer';
import {
	createTax,
	deleteOneTax,
	findTaxes,
} from '~/data-layer/mongoose/tax.data-service';
import { TaxDto } from '~/dtos/tax.dto';
import { ITax } from '~/interfaces/tax.interface';
import { ItemDto } from '~/dtos/item.dto';
import {
	createItem,
	deleteOneItem,
} from '~/data-layer/mongoose/item.data-layer';
import { IItem } from '~/interfaces/item.interface';
import { BundleDto } from '~/dtos/bundle.dto';
import { createBundle } from '~/data-layer/mongoose/bundle.data-layer';
import { createBundleItem } from '~/data-layer/mongoose/bundle-item.data-layer';
import { IBundle } from '~/interfaces/bundle.interface';

class AdminService {
	public async createFoodType(
		foodTypeData: FoodTypeDto,
		id: string
	): Promise<IFoodType> {
		if (isEmpty(foodTypeData)) {
			throw new HttpException(400, 'No valid food-type data found');
		}

		return createFoodType({
			args: {
				name: foodTypeData.name,
				createdBy: id,
			},
		});
	}

	public async deleteFoodType(id: string, userId: string) {
		return deleteOneFoodType({ args: { _id: id, createdBy: userId } });
	}

	public async getTaxes(id: string) {
		return findTaxes({ args: { createdBy: id } });
	}

	public async createTax(taxData: TaxDto, id: string): Promise<ITax> {
		if (isEmpty(taxData)) {
			throw new HttpException(400, 'No valid tax data found');
		}

		return createTax({
			args: {
				name: taxData.name,
				tax: taxData.tax,
				createdBy: id,
			},
		});
	}

	public async deleteTax(id: string, userId: string) {
		return deleteOneTax({ args: { _id: id, createdBy: userId } });
	}

	public async createItem(itemData: ItemDto, id: string): Promise<IItem> {
		if (isEmpty(itemData)) {
			throw new HttpException(400, 'No valid item data found');
		}

		return createItem({
			args: {
				name: itemData.name,
				tax: itemData.tax,
				foodType: itemData.foodType,
				price: itemData.price,
				createdBy: id,
			},
		});
	}

	public async deleteItem(id: string, userId: string) {
		return deleteOneItem({ args: { _id: id, createdBy: userId } });
	}

	public async addBundle(bundleData: BundleDto, id: string): Promise<IBundle> {
		if (isEmpty(bundleData)) {
			throw new HttpException(400, 'No valid bundle data found');
		}

		let bundleItemIds: string[] = [];
		let items: string[] = [];
		for (let i = 0; i < bundleData.bundleItems.length; i++) {
			const bundleDataItem = bundleData.bundleItems[i];
			const bundleItem = await createBundleItem({
				args: {
					item: bundleDataItem.item,
					quantity: bundleDataItem.quantity,
					discount: bundleDataItem.discount,
					createdBy: id,
				},
			});
			bundleItemIds.push(bundleItem._id);
			items.push(bundleDataItem.item);
		}

		return createBundle({
			args: {
				name: bundleData.name,
				bundleItems: bundleItemIds,
				items,
				itemCount: bundleItemIds.length,
			},
		});
	}
}

export default AdminService;
