import { paginateItems } from '~/data-layer/mongoose/item.data-layer';
import { IItem } from '~/interfaces/item.interface';
import { ITax } from '~/interfaces/tax.interface';
import { paginateItemFactory } from '~/data-layer/mongoose/factory/item.factory';

class ItemService {
	public async getItems(
		search: string | undefined,
		limit: number | undefined,
		page: number | undefined
	) {
		const { query, options } = paginateItemFactory(search, limit, page);

		const items = await paginateItems({
			query,
			options,
		});

		const finalItemDocs = items.docs.map((item: IItem) => {
			const total = (
				item.price +
				(item.price * (item.tax as ITax).tax) / 100
			).toFixed(2);

			return {
				...item,
				...{ total },
			};
		});

		return {
			...items,
			...{ docs: finalItemDocs },
		};
	}
}

export default ItemService;
