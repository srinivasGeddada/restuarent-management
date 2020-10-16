import { Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@Inject('UserRepository') private readonly userRepo: Repository<UserEntity>) {}

	getByEmail(email: string) {
		return this.userRepo.find({
			where: { email: email }
		});
	}

	createUser(data: any) {
		return this.userRepo.save(data);
	}

	async signToken(user: any) {
		const payload = user;
		return sign(payload, 'this is secret');
	}
}
