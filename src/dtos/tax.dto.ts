import { IsNumber, IsString } from 'class-validator';

export class TaxDto {
	@IsString()
	public name: string;

	@IsNumber()
	public tax: number;
}
