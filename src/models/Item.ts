import mongoose, { PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IItem } from '~/interfaces/item.interface';

const itemSchema = new mongoose.Schema(
	{
		name: String,
		price: Number,
		tax: {
			type: String,
			ref: 'Tax',
		},
		foodType: {
			type: String,
			ref: 'FoodType',
		},
		createdBy: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

itemSchema.plugin(mongoosePaginate);

interface IItemModel<T extends mongoose.Document> extends PaginateModel<T> {}

const itemModel: IItemModel<IItem & mongoose.Document> = mongoose.model<
	IItem & mongoose.Document
>('Item', itemSchema) as IItemModel<IItem & mongoose.Document>;

export default itemModel;
