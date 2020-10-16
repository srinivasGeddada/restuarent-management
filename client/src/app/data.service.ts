import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	sdf: string = 'process.env.PORT';
	constructor(private readonly http: HttpClient) {}

	getall(): Observable<any> {
		return this.http.get<any>(`${this.sdf}/meals/dishes/${1}`);
	}

	login(data): Observable<any> {
		return this.http.post<any>(`${this.sdf}/user/login`, data);
	}
	createDish(data): Observable<any> {
		return this.http.post<any>(`${this.sdf}/meals/create/dish`, data);
	}
	createMeal(data): Observable<any> {
		return this.http.post<any>(`${this.sdf}/meals/create`, data);
	}

	regsiterUser(data): Observable<any> {
		return this.http.post(`${this.sdf}/user/register`, data);
	}

	getMeals(): Observable<any> {
		return this.http.get(`${this.sdf}/meals/all`);
	}
	getAllDishes(): Observable<any> {
		return this.http.get(`${this.sdf}/meals/dishes/ss/ss`);
	}

	getMealByID(id: number): Observable<any> {
		return this.http.get(`${this.sdf}/meals/dishes/meal/${id}`);
	}
}
