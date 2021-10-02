import mongoose, { FilterQuery } from 'mongoose';
import { IFoodType } from '~/interfaces/food-type.interface';
import FoodType from '~/models/FoodType';

const findFoodTypes = ({
	args = {},
	sortArgs = { createdAt: -1 },
	selectArgs = '',
}: {
	args?: FilterQuery<IFoodType & mongoose.Document>;
	sortArgs?: object;
	selectArgs?: string;
}) => {
	return FoodType.find(args).sort(sortArgs).select(selectArgs).lean();
};

const createFoodType = ({
	args = {},
}: {
	args: FilterQuery<IFoodType>;
}): Promise<IFoodType> => {
	return FoodType.create(args).then((result) => result.save());
};

const deleteOneFoodType = ({
	args = {},
}: {
	args: FilterQuery<IFoodType & mongoose.Document>;
}) => {
	return FoodType.deleteOne(args);
};

export { findFoodTypes, createFoodType, deleteOneFoodType };
