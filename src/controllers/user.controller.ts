import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, UserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';
import { GlobalResponse } from 'src/shared/response';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get()
	getAll() {
		return { status: 'user working' };
	}

	@Post('login')
	async loginUser(@Body() data: LoginDto) {
		const user = await this.userService.getByEmail(data.email);
		if (user.length > 0) {
			if (await compare(data.password, user[0].password)) {
				const token = await this.userService.signToken(data.email);
				const User = user[0];
				return new GlobalResponse(true, HttpStatus.OK, { User, token }, '');
			} else {
				return new GlobalResponse(false, HttpStatus.NOT_ACCEPTABLE, {}, 'Invalid Password');
			}
		} else {
			return new GlobalResponse(false, HttpStatus.NOT_ACCEPTABLE, {}, 'Invalid Email');
		}
	}
	/**
 * check email
 * hash password
 * sign token
 */
	@Post('register')
	async createUser(@Body() data: UserDto) {
		if ((await this.userService.getByEmail(data.email)).length > 0) {
			return new GlobalResponse(false, HttpStatus.CONFLICT, {}, 'Email Already In Use');
		} else {
			data.password = await hash(data.password, 8);
			const data1 = await this.userService.createUser(data);
			var token = await this.userService.signToken(data.email);
			return new GlobalResponse(true, HttpStatus.CREATED, { data1, token }, 'Success');
		}
	}
}
