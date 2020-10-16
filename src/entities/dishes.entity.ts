import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientEntity } from './ingredients.entity';
import { MealsDishesEntity } from './mealsdishes.entity';

@Entity({ name: 'dishes' })
export class DishEntity {
	@PrimaryGeneratedColumn() dish_id: number;
	@Column({ type: 'varchar', length: 50 })
	dish_name: string;
	@Column({ type: 'varchar', length: 500 })
	dish_description: string;
	@Column({ type: 'varchar', length: 50 })
	dish_type: string;
	@Column({ type: 'boolean', default: false })
	is_deleted: boolean;

	@OneToMany(() => IngredientEntity, (ingredient: IngredientEntity) => ingredient.dish)
	ingredient: IngredientEntity[];

	@OneToMany(() => MealsDishesEntity, (mealdish: MealsDishesEntity) => mealdish.dish)
	mealdish: MealsDishesEntity;
}
