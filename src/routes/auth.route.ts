import { Router } from 'express';

import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import { AuthDto } from '~/dtos/auth.dto';
import AuthController from '~/controllers/auth.controller';

class AuthRoute implements Route {
	public path = '/auth';
	public router = Router();
	public authController = new AuthController();

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
		 * /auth/register:
		 *  get:
		 *    tags:
		 *     - Auth
		 *    description: register a user
		 *    parameters:
		 *    - name: username
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: a new username for the user
		 *    - name: password
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: password for the new user
		 *    response:
		 *     201:
		 *       description: user registered
		 *     400:
		 *       description: username or password is not given
		 */

		/**
		 * @swagger
		 * /auth/login:
		 *  get:
		 *    tags:
		 *     - Auth
		 *    description: login a user
		 *    parameters:
		 *    - name: username
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: username of the user
		 *    - name: password
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: password of the user
		 *    response:
		 *     200:
		 *       description: user logged in
		 *     400:
		 *       description: username or password is incorrect
		 */

		this.router.post(
			`${this.path}/register`,
			validationMiddleware(AuthDto),
			this.authController.register
		);

		this.router.post(
			`${this.path}/login`,
			validationMiddleware(AuthDto),
			this.authController.login
		);
	}
}

export default AuthRoute;
