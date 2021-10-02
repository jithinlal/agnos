import { IUser } from '~/interfaces/user.interface';
import { IOrderItem } from '~/interfaces/order-item.interface';

export interface IOrder {
	_id: string;
	totalPrice: string;
	createdBy: string | IUser;
	orderItems: string[] | IOrderItem[];
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}
