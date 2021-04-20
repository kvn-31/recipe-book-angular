import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Vegane Bolognese', 'Simply the best', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg'),
    new Recipe('Chicken Micken', 'Simply cruel', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-bolognese-b4f9b85.jpg')

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
   }

}
