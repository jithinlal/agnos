import { IUser } from '~/interfaces/user.interface';

export interface ITax {
	_id: string;
	name: string;
	tax: number;
	createdBy: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
