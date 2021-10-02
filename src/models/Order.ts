import mongoose from 'mongoose';
import { orderStatus } from '~/sets/order-status';
import { IOrder } from '~/interfaces/order.interface';
import { ORDER_STATUS } from '~/enums/order-status.enum';

const orderSchema = new mongoose.Schema(
	{
		totalPrice: String,
		orderItems: [{ type: String, ref: 'OrderItem' }],
		status: {
			type: String,
			enum: orderStatus,
			default: ORDER_STATUS.PENDING,
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

const orderModel = mongoose.model<IOrder & mongoose.Document>(
	'Order',
	orderSchema
);

export default orderModel;
