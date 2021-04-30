import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  // My Solution
  onAddToShoppingListClick() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  /*
  Alternative Solution by course
  onAddToShoppingListClick(e) {
    e.preventDefault();
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  */

}
