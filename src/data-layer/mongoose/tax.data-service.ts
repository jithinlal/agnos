import mongoose, { FilterQuery } from 'mongoose';
import { ITax } from '~/interfaces/tax.interface';
import Tax from '~/models/Tax';

const findTaxes = ({
	args = {},
	sortArgs = { createdAt: -1 },
	selectArgs = '',
}: {
	args?: FilterQuery<ITax & mongoose.Document>;
	sortArgs?: object;
	selectArgs?: string;
}) => {
	return Tax.find(args).sort(sortArgs).select(selectArgs).lean();
};

const createTax = ({
	args = {},
}: {
	args: FilterQuery<ITax>;
}): Promise<ITax> => {
	return Tax.create(args).then((result) => result.save());
};

const deleteOneTax = ({
	args = {},
}: {
	args: FilterQuery<ITax & mongoose.Document>;
}) => {
	return Tax.deleteOne(args);
};

export { findTaxes, createTax, deleteOneTax };
