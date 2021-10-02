import mongoose from 'mongoose';
import { roles } from '~/sets/roles';
import { IUser } from '~/interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		role: {
			type: String,
			enum: roles,
		},
		password: String,
		token: String,
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
