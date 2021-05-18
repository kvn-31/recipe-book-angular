import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Recipe } from '../models/recipe.model'
import { RecipeService } from './recipe.service'
import { map } from 'rxjs/operators'

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService
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
		this.http
			.get<Recipe[]>(
				'https://angular-udemy-course-87367-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
			)
			.pipe(
				map((recipes) => {
					// this map is not the rxjs operator, its the normal js array method
					// takes an anonymous function which is executed for every element in array
					// general we do the mapping here to have an empty ingredients array if NO ingredients are stored on the server
					return recipes.map((recipe) => {
						return {
							...recipe,
							ingredients: recipe.ingredients
								? recipe.ingredients
								: [],
						}
					})
				})
			)
			.subscribe((recipes) => {
				this.recipeService.setRecipes(recipes)
			})
	}
}
