export class UserDto {
	email: string;
	password: string;
	user_name: string;
	role: string;
}

export class DishDto {
	dish_name: string;
	dish_type: string;
	dish_description:string;
	ingredients?: Array<Partial<IngredientDto>>;
}
export class IngredientDto {
	ingredient_name: string;
	ingredient_type: string;
	ingredient_quantity: string;
	dish_id?: number;
}
export class MealDto {
	meal_name: string;
	price: string;
	cuisine: string;
	meal_photo?: string;
	meal_type: string;
	time: string;
	dish_id?: number[];
}

export class LoginDto {
	email: string;
	password: string;
}
