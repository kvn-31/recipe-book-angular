import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Recipe } from '../models/recipe.model'
import { RecipeService } from './recipe.service'
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService
	) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes()
		this.http
			.put(
				'https://angular-udemy-course-87367-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
				recipes
			)
			.subscribe((response) => {
				console.log(response)
			})
	}

	fetchRecipes() {
		return this.http
			.get<Recipe[]>(
				'https://angular-udemy-course-87367-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
			)
			.pipe(
				map((recipes) => {
					return recipes.map((recipe) => {
						return {
							...recipe,
							ingredients: recipe.ingredients
								? recipe.ingredients
								: [],
						}
					})
				}),
				tap((recipes) => {
					this.recipeService.setRecipes(recipes)
				})
			)
	}
}
