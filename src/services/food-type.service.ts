import { findFoodTypes } from '~/data-layer/mongoose/food-type.data-layer';

class FoodTypeService {
	public async getFoodTypes() {
		return findFoodTypes({ args: {} });
	}
}

export default FoodTypeService;
