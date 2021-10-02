import { NextFunction, Request, Response } from 'express';
import { FoodTypeDto } from '~/dtos/food-type.dto';
import AdminService from '~/services/admin.service';
import { TaxDto } from '~/dtos/tax.dto';
import { ItemDto } from '~/dtos/item.dto';

class AdminController {
	private adminService = new AdminService();

	public createFoodType = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const foodTypeData: FoodTypeDto = req.body;
		const { _id } = req.user;

		try {
			const foodType = await this.adminService.createFoodType(
				foodTypeData,
				_id
			);

			res.status(201).json({ data: foodType });
		} catch (error) {
			next(error);
		}
	};

	public deleteFoodType = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { _id } = req.user;

		try {
			const result = await this.adminService.deleteFoodType(id, _id);

			res.status(200).json({ data: result });
		} catch (error) {
			next(error);
		}
	};

	public fetchTaxes = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { _id } = req.user;

		try {
			const taxes = await this.adminService.getTaxes(_id);

			res.status(200).json({ data: taxes });
		} catch (error) {
			next(error);
		}
	};

	public createTax = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const taxData: TaxDto = req.body;
		const { _id } = req.user;

		try {
			const tax = await this.adminService.createTax(taxData, _id);

			res.status(201).json({ data: tax });
		} catch (error) {
			next(error);
		}
	};

	public deleteTax = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { _id } = req.user;

		try {
			const result = await this.adminService.deleteTax(id, _id);

			res.status(200).json({ data: result });
		} catch (error) {
			next(error);
		}
	};

	public createItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const itemData: ItemDto = req.body;
		const { _id } = req.user;

		try {
			const item = await this.adminService.createItem(itemData, _id);

			res.status(201).json({ data: item });
		} catch (error) {
			next(error);
		}
	};

	public deleteItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { _id } = req.user;

		try {
			const result = await this.adminService.deleteItem(id, _id);

			res.status(200).json({ data: result });
		} catch (error) {
			next(error);
		}
	};
}

export default AdminController;
