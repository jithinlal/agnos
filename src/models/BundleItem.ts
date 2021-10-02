import mongoose from 'mongoose';
import { IBundleItem } from '~/interfaces/bundle-item.interface';

const bundleItemSchema = new mongoose.Schema(
	{
		item: {
			type: String,
			ref: 'Item',
		},
		discount: Number,
		quantity: Number,
		createdBy: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const bundleItemModel = mongoose.model<IBundleItem & mongoose.Document>(
	'BundleItem',
	bundleItemSchema
);

export default bundleItemModel;
