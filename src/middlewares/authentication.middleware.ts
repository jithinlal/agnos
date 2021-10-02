import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { verify } from 'jsonwebtoken';
import { IUser } from '~/interfaces/user.interface';

const getBearerToken = (req: Request) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1] as string;
	} else if (req.query && req.query.token) {
		return req.query.token as string;
	}
	return '';
};

async function authenticate(req: Request, _res: Response, next: NextFunction) {
	const token = getBearerToken(req);

	if (!token) {
		next(new HttpException(403, 'Authentication token missing'));
	}

	try {
		req.user = (await verify(token, process.env.SECRET!)) as IUser;

		next();
	} catch (error) {
		console.log(error);
		next(new HttpException(401, 'Wrong authentication token'));
	}
}

export default authenticate;
