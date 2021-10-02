import { isEmpty } from 'lodash';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AuthDto } from '~/dtos/auth.dto';
import HttpException from '~/exceptions/HttpException';
import {
	createUser,
	findOneUser,
	findUserAndUpdate,
} from '~/data-layer/mongoose/user.data-layer';
import { USER_TYPE } from '~/enums/user_type.enum';
import { IUser } from '~/interfaces/user.interface';

class AuthService {
	public async register(authData: AuthDto): Promise<IUser> {
		if (isEmpty(authData)) {
			throw new HttpException(400, 'No valid auth data found');
		}

		const isUserExists = await findOneUser({
			args: { username: authData.username },
		});
		if (isUserExists) {
			throw new HttpException(409, 'Username already exists');
		}

		const hashPassword = await hash(authData.password, 10);

		let user = await createUser({
			args: {
				username: authData.username,
				password: hashPassword,
				role: USER_TYPE.CUSTOMER,
			},
		});

		const token = sign(
			{
				_id: user!._id,
				username: user!.username,
				role: user!.role,
			},
			process.env.SECRET!,
			{ expiresIn: '2h' }
		);

		user = await findUserAndUpdate({
			args: { _id: user!._id },
			updateArgs: { token },
		});

		return user;
	}

	public async login(authData: AuthDto): Promise<IUser> {
		if (isEmpty(authData)) {
			throw new HttpException(400, 'No valid auth data found');
		}

		const user = await findOneUser({
			args: { username: authData.username },
			selectArgs: '',
		});
		if (!user) {
			throw new HttpException(404, 'Username is not registered.');
		}

		const result = await compare(authData.password, user.password as string);
		if (!result) {
			throw new HttpException(403, 'Username or password is wrong');
		}

		const token = sign(
			{
				_id: user._id,
				username: user.username,
				role: user.role,
			},
			process.env.SECRET!,
			{ expiresIn: '2h' }
		);

		return findUserAndUpdate({
			args: { _id: user!._id },
			updateArgs: { token },
		});
	}
}

export default AuthService;
