import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IOrder } from '~/interfaces/order.interface';
import Order from '~/models/Order';

const createOrder = ({
	args = {},
}: {
	args: FilterQuery<IOrder>;
}): Promise<IOrder> => {
	return Order.create(args).then((result) => result.save());
};

const findOrderById = (id: string) => {
	return Order.findById(id);
};

const findOrderAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<IOrder & mongoose.Document>;
	updateArgs: UpdateQuery<IOrder>;
	selectArgs?: string;
}) => {
	return Order.findOneAndUpdate(args, updateArgs, { new: true });
};

export { createOrder, findOrderById, findOrderAndUpdate };
