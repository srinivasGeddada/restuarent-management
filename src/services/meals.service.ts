import { Inject, Injectable } from '@nestjs/common';
import { DishEntity } from 'src/entities/dishes.entity';
import { IngredientEntity } from 'src/entities/ingredients.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealsDishesEntity } from 'src/entities/mealsdishes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
	constructor(
		@Inject('MealsRepository') private readonly mealsRepo: Repository<MealsEntity>,
		@Inject('DishRepository') private readonly dishRepo: Repository<DishEntity>,
		@Inject('IngredientRepository') private readonly ingredientRepo: Repository<IngredientEntity>,
		@Inject('MealsDishesRepository') private readonly mealsdishRepo: Repository<MealsDishesEntity>
	) {}

	createMeals(data): Promise<MealsEntity> {
		return this.mealsRepo.save(data);
	}

	createdish(data): Promise<DishEntity> {
		return this.dishRepo.save(data);
	}
	createIngredents(data) {
		return this.ingredientRepo.save(data);
	}
	createMealsAndDishes(data) {
		return this.mealsdishRepo.save(data);
	}

	getDishesByID(id) {
		return this.dishRepo.find({ where: { dish_id: id }, relations: [ 'ingredient' ] });
	}
	getdishesByMealID(id) {
		return this.mealsdishRepo.find({
			where: { meal_id: id },
			relations: [ 'dish', 'dish.ingredient' ]
		});
	}

	getMeals() {
		return this.mealsRepo.find();
	}

	getAllDishes() {
		return this.dishRepo.find();
	}
}
