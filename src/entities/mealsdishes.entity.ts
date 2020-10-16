import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { DishEntity } from './dishes.entity';
import { MealsEntity } from './meals.entity';

@Entity({ name: 'mealsdishXref' })
export class MealsDishesEntity {
	@PrimaryGeneratedColumn() id: number;
	@Column() meal_id: number;
	@Column() dish_id: number;

	@ManyToOne(() => MealsEntity, (meal: MealsEntity) => meal.mealdish)
	@JoinColumn({ name: 'meal_id' })
	meal: MealsEntity;

	@ManyToOne(() => DishEntity, (dish: DishEntity) => dish.mealdish)
	@JoinColumn({ name: 'dish_id' })
	dish: DishEntity;
}
