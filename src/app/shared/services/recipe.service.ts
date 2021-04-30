import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Vegane Bolognese', 
      'Simply the best', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg',
      [
        new Ingredient('Soja Hack', 1),
        new Ingredient('Paprika', 2),
        new Ingredient('Creme Vega', 1)
      ]
      ),
    new Recipe('Chicken Micken', 
    'Simply cruel', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg',
    [
      new Ingredient('Dead Animal', 4)
    ]
    )
  ];

}
