import { IsNumber, IsString } from 'class-validator';
import { IsValidBundleItem } from '~/utils/validateBundleItem';

export class BundleItemDto {
	@IsString()
	public item: string;

	@IsNumber()
	public discount: number;

	@IsNumber()
	public quantity: number;
}

export class BundleDto {
	@IsString()
	public name: string;

	@IsValidBundleItem({ message: 'Incomplete bundle item data' })
	public bundleItems: BundleItemDto[];
}
