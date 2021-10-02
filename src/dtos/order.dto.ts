import { IsNumber, IsString } from 'class-validator';
import { IsValidOrderItem } from '~/utils/validateOrderItem';

export class OrderItemDto {
	@IsString()
	public item: string;

	@IsNumber()
	public quantity: number;
}

export class OrderDto {
	@IsValidOrderItem({ message: 'Incomplete order item data' })
	public orderItems: OrderItemDto[];
}
