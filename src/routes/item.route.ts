import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import ItemController from '~/controllers/item.controller';

class ItemRoute implements Route {
	public path = '/item';
	public router = Router();
	public itemController = new ItemController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /item:
		 *  get:
		 *    tags:
		 *     - Item
		 *    description: fetch all food items
		 *    response:
		 *     200:
		 *       description: array of food items
		 */

		this.router.get(`${this.path}`, this.itemController.fetchItems);
	}
}

export default ItemRoute;
