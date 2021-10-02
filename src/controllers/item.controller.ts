import { NextFunction, Request, Response } from 'express';
import ItemService from '~/services/item.service';

class ItemController {
	private itemService = new ItemService();

	public fetchItems = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const search = req.query.name as string;
		const limit = +req.query.limit!;
		const page = +req.query.page!;

		try {
			const items = await this.itemService.getItems(search, limit, page);

			res.status(200).json({ data: items });
		} catch (error) {
			next(error);
		}
	};
}

export default ItemController;
