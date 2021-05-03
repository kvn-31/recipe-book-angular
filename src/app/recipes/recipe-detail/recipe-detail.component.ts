import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  recipeId!: number;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( 
      (queryParams: Params) => {
        this.recipeId = +queryParams['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      }
    );
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

  onEditRecipe() {
    // easier
    this.router.navigate(['edit'], {relativeTo: this.route});

    // for demo purposes, more complex path (go up one level, add id, add edit)
    // this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});
  }

}
