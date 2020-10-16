import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { DishDto, IngredientDto, MealDto } from 'src/dto/user.dto';
import { MealsService } from 'src/services/meals.service';
import { GlobalResponse } from 'src/shared/response';

@Controller('meals')
export class MealsController {
	constructor(private readonly mealService: MealsService) {}

	@Get('dishes/:id')
	async getDishesByID(@Param('id') id) {
		const data = await this.mealService.getDishesByID(id);
		return new GlobalResponse(true, HttpStatus.OK, data, '');
	}

	@Post('create')
	async createMeals(@Body() data: MealDto) {
		const meal = await this.mealService.createMeals(data);
		const dishes = data.dish_id.map((dish) => {
			return { dish_id: dish, meal_id: meal.meal_id };
		});
		console.log(dishes);
		const mealsDishes = await this.mealService.createMealsAndDishes(dishes);
		return new GlobalResponse(true, HttpStatus.CREATED, meal, 'Success');
	}

	@Post('create/dish')
	async createDishes(@Body() data: DishDto) {
		const dish = await this.mealService.createdish(data);
		const ingredients = await data.ingredients.map((ingredient) => {
			ingredient.dish_id = dish.dish_id;
			return ingredient;
		});
		const da = await this.createIngredients(ingredients);
		return new GlobalResponse(true, HttpStatus.CREATED, {}, 'Succes');
	}
	async createIngredients(data: Array<Partial<IngredientDto>>): Promise<any[]> {
		const ingredients = await this.mealService.createIngredents(data);
		return ingredients;
	}

	@Get('dishes/meal/:id')
	async getDishesByMealID(@Param('id') id) {
		const data = await this.mealService.getdishesByMealID(id);
		return new GlobalResponse(true, HttpStatus.OK, data, '');
	}

	@Get('all')
	async getMealsAll() {
		return new GlobalResponse(true, HttpStatus.OK, await this.mealService.getMeals(), '');
	}

	@Get('dishes/ss/ss')
	async getallDishes() {
		const data = await this.mealService.getAllDishes();
		return new GlobalResponse(true, HttpStatus.OK, data, '');
	}
}
