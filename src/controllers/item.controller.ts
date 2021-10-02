import { NextFunction, Request, Response } from 'express';
import ItemService from '~/services/item.service';
import { OrderDto } from '~/dtos/order.dto';

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

	public addToCart = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const cartItems: OrderDto = req.body;

		try {
			const result = await this.itemService.addToCart(cartItems);

			res.status(200).json({ data: result });
		} catch (error) {
			next(error);
		}
	};

	public createOrder = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const orderData: OrderDto = req.body;
		const { _id } = req.user;

		try {
			const result = await this.itemService.createOrder(orderData, _id);

			res.status(200).json({ data: result });
		} catch (error) {
			next(error);
		}
	};
}

export default ItemController;
