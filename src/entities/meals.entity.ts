import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MealsDishesEntity } from './mealsdishes.entity';

@Entity({ name: 'meals' })
export class MealsEntity {
	@PrimaryGeneratedColumn() meal_id: number;
	@Column({ type: 'varchar', length: 50 })
	meal_name: string;
	@Column({ type: 'varchar', length: 50 })
	price: string;
	@Column({ type: 'varchar', length: 50 })
	cuisine: string;
	@Column({ type: 'varchar', length: 500 })
	meal_photo: string;
	@Column({ type: 'boolean', default: false })
	meal_type: string;
	@Column({ type: 'varchar', length: 50 })
	time: string;
	@Column({ type: 'boolean', default: false })
	is_deleted: boolean;
	@OneToMany(() => MealsDishesEntity, (mealdish: MealsDishesEntity) => mealdish.dish)
	mealdish: MealsDishesEntity;
}
