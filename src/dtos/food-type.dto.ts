import { IsString } from 'class-validator';

export class FoodTypeDto {
	@IsString()
	public name: string;
}
