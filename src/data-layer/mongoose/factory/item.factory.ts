import mongoose, { FilterQuery, PaginateOptions } from 'mongoose';
import { IItem } from '~/interfaces/item.interface';

const paginateItemFactory = (
	search: string | undefined,
	limit: number | undefined,
	page: number | undefined
) => {
	let query: FilterQuery<IItem & mongoose.Document> = {};
	if (search) {
		query = {
			...query,
			...{
				name: new RegExp(search, 'i'),
			},
		};
	}

	let options: PaginateOptions = {
		sort: { createdAt: -1 },
		populate: [
			{
				path: 'tax',
			},
			{
				path: 'foodType',
			},
		],
		lean: true,
	};
	if (page && limit) {
		options = {
			...options,
			...{
				limit,
				page,
			},
		};
	} else {
		options = { ...options, ...{ pagination: false } };
	}

	return { query, options };
};

export { paginateItemFactory };
