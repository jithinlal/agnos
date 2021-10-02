import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidOrderItem(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsValidOrderItem',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any): Promise<boolean> | boolean {
					let flag = true;
					for (let i = 0; i < value.length; i++) {
						if (!value[i].item || !value[i].quantity) {
							flag = false;
						}
					}

					return flag;
				},
			},
		});
	};
}
