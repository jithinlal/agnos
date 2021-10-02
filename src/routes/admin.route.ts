import { Router } from 'express';

import Route from '~/interfaces/routes.interface';
import authenticate from '~/middlewares/authentication.middleware';
import { grantAccess } from '~/middlewares/authrosation.middleware';
import AdminController from '~/controllers/admin.controller';
import validationMiddleware from '~/middlewares/validation.middleware';
import { FoodTypeDto } from '~/dtos/food-type.dto';
import { TaxDto } from '~/dtos/tax.dto';
import { ItemDto } from '~/dtos/item.dto';
import { BundleDto } from '~/dtos/bundle.dto';

class AdminRoute implements Route {
	public path = '/admin';
	public router = Router();
	public adminController = new AdminController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /admin:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /admin/food-type:
		 *  post:
		 *    tags:
		 *     - Admin
		 *    description: create a new food type
		 *    parameters:
		 *    - name: food type name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the food type
		 *    response:
		 *     201:
		 *       description: food type created
		 *     400:
		 *       description: not all the data was given
		 */

		/**
		 * @swagger
		 * /admin/food-type/{id}:
		 *  delete:
		 *    tags:
		 *     - Admin
		 *    description: delete a food type
		 *    parameters:
		 *    - name: id
		 *      in: params
		 *      type: string
		 *      required: true
		 *      description: id of food type
		 *    responses:
		 *     201:
		 *       description: food type deleted
		 */

		/**
		 * @swagger
		 * /admin/tax:
		 *  post:
		 *    tags:
		 *     - Admin
		 *    description: create a new tax
		 *    parameters:
		 *    - name: tax name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the tax
		 *    - name: tax value
		 *      in: body
		 *      required: true
		 *      description: tax rate
		 *      type: number
		 *    response:
		 *     201:
		 *       description: tax created
		 *     400:
		 *       description: not all the data was given
		 */

		/**
		 * @swagger
		 * /admin/tax/{id}:
		 *  delete:
		 *    tags:
		 *     - Admin
		 *    description: delete a tax
		 *    parameters:
		 *    - name: id
		 *      in: params
		 *      type: string
		 *      required: true
		 *      description: id of tax
		 *    responses:
		 *     201:
		 *       description: tax deleted
		 */

		/**
		 * @swagger
		 * /admin/bundle:
		 *  post:
		 *    tags:
		 *     - Admin
		 *    description: create a new bundle
		 *    parameters:
		 *    - name: bundle name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the bundle
		 *    - name: items
		 *      in: body
		 *      required: true
		 *      description: array of bundle items with item id, discount and quanity
		 *      type: array
		 *    response:
		 *     201:
		 *       description: bundle created
		 *     400:
		 *       description: not all the data was given
		 */

		this.router.post(
			`${this.path}/food-type`,
			validationMiddleware(FoodTypeDto),
			authenticate,
			grantAccess('create', 'food-type'),
			this.adminController.createFoodType
		);
		this.router.delete(
			`${this.path}/food-type/:id`,
			authenticate,
			grantAccess('delete', 'food-type'),
			this.adminController.deleteFoodType
		);
		this.router.get(
			`${this.path}/tax`,
			authenticate,
			grantAccess('read', 'tax'),
			this.adminController.fetchTaxes
		);
		this.router.post(
			`${this.path}/tax`,
			validationMiddleware(TaxDto),
			authenticate,
			grantAccess('create', 'tax'),
			this.adminController.createTax
		);
		this.router.delete(
			`${this.path}/tax/:id`,
			authenticate,
			grantAccess('delete', 'tax'),
			this.adminController.deleteTax
		);
		this.router.post(
			`${this.path}/item`,
			validationMiddleware(ItemDto),
			authenticate,
			grantAccess('create', 'item'),
			this.adminController.createItem
		);
		this.router.delete(
			`${this.path}/item/:id`,
			authenticate,
			grantAccess('delete', 'item'),
			this.adminController.deleteItem
		);
		this.router.post(
			`${this.path}/bundle`,
			validationMiddleware(BundleDto),
			authenticate,
			grantAccess('create', 'bundle'),
			this.adminController.createBundle
		);
	}
}

export default AdminRoute;
