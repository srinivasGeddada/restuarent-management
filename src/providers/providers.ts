import { DishEntity } from 'src/entities/dishes.entity';
import { IngredientEntity } from 'src/entities/ingredients.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealsDishesEntity } from 'src/entities/mealsdishes.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Connection, getRepository } from 'typeorm';

export const Providers = [
	{
		provide: 'UserRepository',
		useFactory: (connection: Connection) => getRepository<UserEntity>(UserEntity),
		inject: [ 'dbConnection' ]
	},
	{
		provide: 'DishRepository',
		useFactory: (connection: Connection) => getRepository(DishEntity),
		inject: [ 'dbConnection' ]
	},
	{
		provide: 'MealsRepository',
		useFactory: (connection: Connection) => getRepository(MealsEntity),
		inject: [ 'dbConnection' ]
	},
	{
		provide: 'IngredientRepository',
		useFactory: (connection: Connection) => getRepository(IngredientEntity),
		inject: [ 'dbConnection' ]
	},
	{
		provide: 'MealsDishesRepository',
		useFactory: (connection: Connection) => getRepository(MealsDishesEntity),
		inject: [ 'dbConnection' ]
	}
];
