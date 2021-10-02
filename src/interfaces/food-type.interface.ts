import { IUser } from '~/interfaces/user.interface';

export interface IFoodType {
	_id: string;
	name: string;
	createdBy: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
