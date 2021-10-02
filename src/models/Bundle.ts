import mongoose from 'mongoose';
import { IBundle } from '~/interfaces/bundle.interface';

const bundleSchema = new mongoose.Schema(
	{
		name: String,
		bundleItems: [{ type: String, ref: 'BundleItem' }],
		items: [{ type: String, ref: 'Item' }],
		itemCount: Number,
		createdBy: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const bundleModel = mongoose.model<IBundle & mongoose.Document>(
	'Bundle',
	bundleSchema
);

export default bundleModel;
