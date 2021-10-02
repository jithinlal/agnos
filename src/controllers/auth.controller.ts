import AuthService from '~/services/auth.service';
import { Request, Response, NextFunction } from 'express';
import { AuthDto } from '~/dtos/auth.dto';

class AuthController {
	public authService = new AuthService();

	public register = async (req: Request, res: Response, next: NextFunction) => {
		const authData: AuthDto = req.body;

		try {
			const result = await this.authService.register(authData);

			res.status(201).json({ data: result });
		} catch (e) {
			next(e);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const authData: AuthDto = req.body;

		try {
			const result = await this.authService.login(authData);

			res.status(201).json({ data: result });
		} catch (e) {
			next(e);
		}
	};
}

export default AuthController;
