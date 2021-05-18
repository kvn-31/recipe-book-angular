import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../models/ingredient.model'
import { Recipe } from '../models/recipe.model'

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>()

	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		'Vegane Bolognese',
	// 		'Simply the best',
	// 		'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg',
	// 		[
	// 			new Ingredient('Soja Hack', 1),
	// 			new Ingredient('Paprika', 2),
	// 			new Ingredient('Creme Vega', 1),
	// 		]
	// 	),
	// 	new Recipe(
	// 		'Chicken Micken',
	// 		'Simply cruel',
	// 		'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg',
	// 		[new Ingredient('Dead Animal', 4)]
	// 	),
	// ],
	private recipes: Recipe[] = []

	constructor() {}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes
		this.recipesChanged.next(this.recipes.slice())
	}

	getRecipes() {
		return this.recipes.slice()
	}

	getRecipe(index: number) {
		return this.recipes[index]
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe)
		this.recipesChanged.next(this.recipes.slice())
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe
		this.recipesChanged.next(this.recipes.slice())
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1)
		this.recipesChanged.next(this.recipes.slice())
	}
}
