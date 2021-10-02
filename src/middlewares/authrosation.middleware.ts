import { Permission } from 'accesscontrol';
import { NextFunction, Request, Response } from 'express';
import HttpException from '~/exceptions/HttpException';
import { roles } from '~/role';

export const grantAccess = (action: string, resource: string) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			const role = req.user.role;
			if (!role) {
				next(new HttpException(404, 'Role could not be found'));
			} else {
				// @ts-ignore
				const permission: Permission = await roles.can(role)[action](resource);

				if (!permission.granted) {
					next(
						new HttpException(
							403,
							'You does not have authorization to perform this task'
						)
					);
				}

				next();
			}
		} catch (error) {
			next(error);
		}
	};
};
