import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { 
    this.shoppingListService.shoppingListUpdated
      .subscribe( (items: Ingredient[]) => this.ingredients = items)
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}