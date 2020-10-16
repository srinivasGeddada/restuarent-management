import { DishEntity } from 'src/entities/dishes.entity';
import { IngredientEntity } from 'src/entities/ingredients.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealsDishesEntity } from 'src/entities/mealsdishes.entity';
import { UserEntity } from 'src/entities/users.entity';
import { createConnection } from 'typeorm';

export const DBProvider = [
	{
		provide: 'dbConnection',
		useFactory: async () => {
			await createConnection({
				type: 'mysql',
				host: process.env.HOST,
				port: 3306,
				username: process.env.USERNAME,
				password: process.env.PASSWORD,
				database: 'restuarent',
				entities: [ UserEntity, MealsEntity, DishEntity, IngredientEntity, MealsDishesEntity ],
				synchronize: false
			});
		}
	}
];
