import { Router } from 'express';

import Route from '~/interfaces/routes.interface';
import FoodTypeController from '~/controllers/food-type.controller';

class FoodTypeRoute implements Route {
	public path = '/food-type';
	public router = Router();
	public foodTypeController = new FoodTypeController();

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
		 * /food-type:
		 *  get:
		 *    tags:
		 *     - Food type
		 *    description: fetch all food types
		 *    response:
		 *     200:
		 *       description: array of food types
		 */

		this.router.get(`${this.path}`, this.foodTypeController.fetchFoodTypes);
	}
}

export default FoodTypeRoute;
