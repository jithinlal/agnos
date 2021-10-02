import mongoose from 'mongoose';
import { ITax } from '~/interfaces/tax.interface';

const taxSchema = new mongoose.Schema(
	{
		name: String,
		tax: Number,
		createdBy: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const taxModel = mongoose.model<ITax & mongoose.Document>('Tax', taxSchema);

export default taxModel;
