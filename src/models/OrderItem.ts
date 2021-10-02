import mongoose from 'mongoose';
import { IOrderItem } from '~/interfaces/order-item.interface';

const orderItemSchema = new mongoose.Schema(
	{
		item: {
			type: String,
			ref: 'Item',
		},
		quantity: Number,
	},
	{
		timestamps: true,
	}
);

const orderItemModel = mongoose.model<IOrderItem & mongoose.Document>(
	'OrderItem',
	orderItemSchema
);

export default orderItemModel;
