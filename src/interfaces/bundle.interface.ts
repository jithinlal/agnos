import { IUser } from '~/interfaces/user.interface';
import { IBundleItem } from '~/interfaces/bundle-item.interface';
import { IItem } from '~/interfaces/item.interface';

export interface IBundle {
	_id: string;
	name: string;
	bundleItems: String[] | IBundleItem[];
	items: String[] | IItem[];
	itemCount: Number;
	createdBy: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
