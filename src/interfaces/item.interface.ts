import { IUser } from '~/interfaces/user.interface';
import { ITax } from '~/interfaces/tax.interface';
import { IFoodType } from '~/interfaces/food-type.interface';

export interface IItem {
	_id: string;
	name: string;
	price: number;
	foodType: string | IFoodType;
	tax: string | ITax;
	createdBy: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
