import mongoose from 'mongoose';
import { IFoodType } from '~/interfaces/food-type.interface';

const foodTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		createdBy: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const foodTypeModel = mongoose.model<IFoodType & mongoose.Document>(
	'FoodType',
	foodTypeSchema
);

export default foodTypeModel;
