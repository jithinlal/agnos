import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import ItemController from '~/controllers/item.controller';
import validationMiddleware from '~/middlewares/validation.middleware';
import { OrderDto } from '~/dtos/order.dto';
import authenticate from '~/middlewares/authentication.middleware';
import { grantAccess } from '~/middlewares/authrosation.middleware';

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
		 *    parameters:
		 *    - name: name
		 *      in: query
		 *      type: string
		 *      description: search by name
		 *    - name: limit
		 *      in: query
		 *      type: number
		 *      description: limit of items to be seen
		 *    - name: page
		 *      in: query
		 *      type: number
		 *      description: page of items to be seen
		 *    response:
		 *     200:
		 *       description: array of food items
		 */

		/**
		 * @swagger
		 * /item/cart:
		 *  post:
		 *    tags:
		 *     - Item
		 *    description: add items to cart
		 *    parameters:
		 *    - name: items
		 *      in: body
		 *      type: array
		 *      description: array of item ids
		 *    response:
		 *     200:
		 *       description: returns the cart total amount
		 */

		/**
		 * @swagger
		 * /item/order:
		 *  post:
		 *    tags:
		 *     - Item
		 *    description: order items
		 *    parameters:
		 *    - name: items
		 *      in: body
		 *      type: array
		 *      description: array of item ids
		 *    response:
		 *     200:
		 *       description: returns the order detail object
		 */

		this.router.get(`${this.path}`, this.itemController.fetchItems);
		this.router.post(
			`${this.path}/cart`,
			validationMiddleware(OrderDto),
			this.itemController.addToCart
		);
		this.router.post(
			`${this.path}/order`,
			validationMiddleware(OrderDto),
			authenticate,
			grantAccess('createOwn', 'order'),
			this.itemController.createOrder
		);
	}
}

export default ItemRoute;
