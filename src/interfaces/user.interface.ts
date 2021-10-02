export interface IUser {
	_id: string;
	username: string;
	role: string;
	password?: string;
	token?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
