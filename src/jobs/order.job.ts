import { findOrderAndUpdate } from '~/data-layer/mongoose/order.data-layer';
import { ORDER_STATUS } from '~/enums/order-status.enum';

const fulFillOrder = async (id: string) => {
	const output = await findOrderAndUpdate({
		args: { _id: id },
		updateArgs: {
			status: ORDER_STATUS.DELIVERED,
		},
	});

	/**
	 * TODO => notification is sent to the user
	 */

	return output;
};

export { fulFillOrder };
