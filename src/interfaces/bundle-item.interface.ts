import { IUser } from '~/interfaces/user.interface';
import { IItem } from '~/interfaces/item.interface';

export interface IBundleItem {
	_id: string;
	item: string | IItem;
	discount: number;
	quantity: number;
	createdBy: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
