import mongoose, { FilterQuery } from 'mongoose';
import { IBundle } from '~/interfaces/bundle.interface';
import Bundle from '~/models/Bundle';
import { PopulateObjectInterface } from '~/interfaces/populate-object.interface';

const createBundle = ({
	args = {},
}: {
	args: FilterQuery<IBundle>;
}): Promise<IBundle> => {
	return Bundle.create(args).then((result) => result.save());
};

const findBundles = ({
	args = {},
	sortArgs = { createdAt: -1 },
	selectArgs = '',
	populateArgs = [],
}: {
	args?: FilterQuery<IBundle & mongoose.Document>;
	sortArgs?: object;
	selectArgs?: string;
	populateArgs?: PopulateObjectInterface[];
}) => {
	return Bundle.find(args)
		.populate(populateArgs)
		.sort(sortArgs)
		.select(selectArgs)
		.lean();
};

const findOneBundle = ({
	args = {},
	sortArgs = { createdAt: -1 },
	selectArgs = '',
	populateArgs = [],
}: {
	args?: FilterQuery<IBundle & mongoose.Document>;
	sortArgs?: object;
	selectArgs?: string;
	populateArgs?: PopulateObjectInterface[];
}) => {
	return Bundle.findOne(args)
		.populate(populateArgs)
		.sort(sortArgs)
		.select(selectArgs)
		.lean();
};

export { createBundle, findBundles, findOneBundle };
