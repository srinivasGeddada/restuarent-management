import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
	selector: 'app-meals',
	templateUrl: './meals.component.html',
	styleUrls: [ './meals.component.css' ]
})
export class MealsComponent implements OnInit {
	constructor(
		private readonly dataService: DataService,
		private fb: FormBuilder,
		private readonly _snackBar: MatSnackBar
	) {}

	meals: [];
	dishes: [];
	dishandIn: [];
	isOpen: boolean = false;
	isCreateMeal: boolean = false;
	dishForm: FormGroup;
	mealForm: FormGroup;

	ngOnInit(): void {
		this.dataService.getMeals().subscribe((res) => {
			this.meals = res.data;
			console.log(this.meals);
		});

		this.dataService.getMealByID(1).subscribe((res) => {
			console.log('this is from me', res);
			this.dishes = res.data;
			console.log(this.dishes);
		});
		this.dataService.getAllDishes().subscribe((res) => {
			this.dishandIn = res.data;
			console.log('heodfs', this.dishandIn);
		});

		this.mealForm = this.fb.group({
			meal_name: '',
			price: '',
			cuisine: '',
			meal_photo: '',
			meal_type: '',
			time: '',
			dish_id: this.fb.array([])
		});
	
		this.dishForm = this.fb.group({
			dish_name: '',
			dish_type: '',
			dish_description: '',
			ingredients: this.fb.array([
				this.fb.group({
					ingredient_name: '',
					ingredient_type: '',
					ingredient_quantity: ''
				})
			])
		});
	}
	get ingredients() {
		return this.dishForm.get('ingredients') as FormArray;
	}

	addIngredients() {
		this.ingredients.push(this.fb.group({ ingredient_name: '', ingredient_type: '', ingredient_quantity: '' }));
	}

	deleteIngredients(index) {
		this.ingredients.removeAt(index);
	}

	submit(e) {
		console.log(e);
	}
	submit1() {
		this.isOpen = this.isOpen === true ? false : true;
	}
	submit2() {
		this.isCreateMeal = this.isCreateMeal === true ? false : true;
	}

	createDish() {
		this.isOpen = false;
		console.log(this.dishForm.value);
		this.dataService.createDish(this.dishForm.value).subscribe((res) => {
			if (res.success) {
				this._snackBar.open(res.message, 'Dismiss', {
					duration: 2000
				});
			}
		});
	}
	createMeal() {
		this.isCreateMeal = false;
		console.log(this.mealForm.value);
		this.dataService.createMeal(this.mealForm.value).subscribe((res) => {
			if (res.success) {
				this._snackBar.open(res.message, 'Dismiss', {
					duration: 2000
				});
			}
		});
	}
}
