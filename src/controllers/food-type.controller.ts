import FoodTypeService from '~/services/food-type.service';
import { NextFunction, Request, Response } from 'express';

class FoodTypeController {
	private foodTypeService = new FoodTypeService();

	public fetchFoodTypes = async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const foodTypes = await this.foodTypeService.getFoodTypes();

			res.status(200).json({ data: foodTypes });
		} catch (error) {
			next(error);
		}
	};
}

export default FoodTypeController;
