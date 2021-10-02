import { FilterQuery } from 'mongoose';
import { IOrderItem } from '~/interfaces/order-item.interface';
import OrderItem from '~/models/OrderItem';

const createOrderItem = ({
	args = {},
}: {
	args: FilterQuery<IOrderItem>;
}): Promise<IOrderItem> => {
	return OrderItem.create(args).then((result) => result.save());
};

export { createOrderItem };
