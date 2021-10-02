import { IsNumber, IsString } from 'class-validator';

export class ItemDto {
	@IsString()
	public name: string;

	@IsNumber()
	public price: number;

	@IsString()
	public foodType: string;

	@IsString()
	public tax: string;
}
