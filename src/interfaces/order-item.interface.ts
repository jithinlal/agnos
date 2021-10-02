import { IItem } from '~/interfaces/item.interface';

export interface IOrderItem {
	_id: string;
	item: string | IItem;
	quantity: number;
	createdAt?: Date;
	updatedAt?: Date;
}
