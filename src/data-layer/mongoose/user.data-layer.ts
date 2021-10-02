import User from '~/models/User';
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IUser } from '~/interfaces/user.interface';

const createUser = ({
	args = {},
}: {
	args: FilterQuery<IUser>;
}): Promise<IUser> => {
	return User.create(args).then((result) => result.save());
};

const findOneUser = ({
	args = {},
	selectArgs = '-password',
}: {
	args: FilterQuery<IUser & mongoose.Document>;
	selectArgs?: string;
}) => {
	return User.findOne(args).select(selectArgs);
};

const findUserAndUpdate = ({
	args = {},
	updateArgs = {},
	selectArgs = '-password',
}: {
	args: FilterQuery<IUser & mongoose.Document>;
	updateArgs: UpdateQuery<IUser>;
	selectArgs?: string;
}) => {
	return User.findOneAndUpdate(args, updateArgs, { new: true }).select(
		selectArgs
	);
};

export { createUser, findOneUser, findUserAndUpdate };
