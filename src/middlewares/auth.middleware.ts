import { Injectable, NestMiddleware, Global, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization;
		if (token) {
			verify(token, 'this is secret', async (err, decoded) => {
				if (err) {
					res.status(HttpStatus.UNAUTHORIZED).json({
						success: false,
						status: HttpStatus.UNAUTHORIZED,
						data: '',
						message: 'Token Mismatch'
					});
				} else {
					const email = Object.values(decoded);
					const user = await this.userService.getByEmail(email[0]);
					if (!user) {
						res.status(HttpStatus.UNAUTHORIZED).json({
							success: false,
							data: '',
							message: 'Token Mismatch'
						});
					}
					next();
				}
			});
		} else {
			res.status(HttpStatus.UNAUTHORIZED).json({
				success: false,
				status: HttpStatus.UNAUTHORIZED,
				data: '',
				message: 'UnAuthorized Access'
			});
		}
	}
}
