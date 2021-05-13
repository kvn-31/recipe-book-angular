import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('f', {static: false}) shoppingListForm!: NgForm;

  subStartedEditing!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editedItem!: Ingredient;

  ngOnInit(): void {
    this.subStartedEditing = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddIngredient(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
      this.shoppingListForm.reset();
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.shoppingListForm.reset();
    
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editItemIndex);
  }

  ngOnDestroy() {
    this.subStartedEditing.unsubscribe();
  }

}
