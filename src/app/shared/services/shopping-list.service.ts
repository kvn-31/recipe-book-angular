import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

// --> Injected globally, the recipe service is only injected into the recipe component (and its child components)
// did the different injections on purpose to test
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListUpdated = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Banana', 2)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.shoppingListUpdated.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.shoppingListUpdated.next(this.ingredients.slice());

  }

  // My solution
  addIngredients(ingredients: Ingredient[]) {
    //this.ingredients = this.ingredients.concat(ingredients);
    // spread operator
    this.ingredients.push(...ingredients);
    this.shoppingListUpdated.next(this.ingredients.slice());
  }

  /* Course Solution
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // } will emmit 1 event for every loop

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log(this.ingredients);
  }
   */
}
