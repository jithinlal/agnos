import Queue from 'bull';
import { ORDER_STATUS } from '~/enums/order-status.enum';
import { fulFillOrder } from '~/jobs/order.job';

const orderQueue = new Queue('orderQueue', process.env.REDIS_URL!);

orderQueue.process(async (job) => {
	const { orderStatus, id } = job.data;

	try {
		switch (orderStatus) {
			case ORDER_STATUS.PENDING: {
				setTimeout(() => fulFillOrder(id), 10000); // an order will be fulfilled after 10s, just an assumption

				return Promise.resolve({ done: true });
			}
			default: {
				return Promise.resolve({ done: false });
			}
		}
	} catch (e) {
		return Promise.reject(e);
	}
});

export { orderQueue };
