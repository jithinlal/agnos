import mongoose, { FilterQuery, PaginateOptions } from 'mongoose';
import { IItem } from '~/interfaces/item.interface';
import Item from '~/models/Item';
import { PopulateObjectInterface } from '~/interfaces/populate-object.interface';

const findItems = ({
	args = {},
	sortArgs = { createdAt: -1 },
	selectArgs = '',
	populateArgs = [],
}: {
	args?: FilterQuery<IItem & mongoose.Document>;
	sortArgs?: object;
	selectArgs?: string;
	populateArgs?: PopulateObjectInterface[];
}) => {
	return Item.find(args)
		.populate(populateArgs)
		.sort(sortArgs)
		.select(selectArgs)
		.lean();
};

const paginateItems = ({
	query = {},
	options = {},
}: {
	query: FilterQuery<IItem & mongoose.Document> | undefined;
	options: PaginateOptions | undefined;
}) => {
	return Item.paginate(query, options);
};

const createItem = ({
	args = {},
}: {
	args: FilterQuery<IItem>;
}): Promise<IItem> => {
	return Item.create(args).then((result) => result.save());
};

const deleteOneItem = ({
	args = {},
}: {
	args: FilterQuery<IItem & mongoose.Document>;
}) => {
	return Item.deleteOne(args);
};

export { findItems, deleteOneItem, createItem, paginateItems };
