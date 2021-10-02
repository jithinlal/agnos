import { Router } from 'express';

import Route from '~/interfaces/routes.interface';

class IndexRoute implements Route {
	public path = '/';
	public router = Router();

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
		 * /:
		 *  get:
		 *    tags:
		 *     - Index
		 *    description: test the route
		 *    response:
		 *     200:
		 *       description: reached
		 */

		this.router.get(`${this.path}`, async (_req, res) => {
			res.status(200).json({ message: 'index' });
		});
	}
}

export default IndexRoute;
