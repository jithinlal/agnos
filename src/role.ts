import { AccessControl } from 'accesscontrol';
import { USER_TYPE } from '~/enums/user-type.enum';

const ac = new AccessControl();

export const roles = (function () {
	ac.grant(USER_TYPE.CUSTOMER).create('order');

	ac.grant(USER_TYPE.ADMIN)
		.create('food-type')
		.delete('food-type')
		.create('tax')
		.read('tax')
		.delete('tax')
		.create('item')
		.delete('item')
		.create('bundle');

	return ac;
})();
