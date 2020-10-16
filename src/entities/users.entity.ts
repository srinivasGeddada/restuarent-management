import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn() user_id: number;
	@Column({ type: 'varchar', length: 50 })
	user_name: string;
	@Column({ type: 'varchar', length: 100 })
	email: string;
	@Column({ type: 'varchar', length: 500 })
	password: string;
	@Column({ type: 'varchar' })
	role: string;
	@Column({ type: 'boolean', default: false })
	is_deleted: boolean;
}
