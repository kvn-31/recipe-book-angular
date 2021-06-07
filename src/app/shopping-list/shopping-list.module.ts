import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { ShoppingListComponent } from './shopping-list.component'

@NgModule({
	imports: [
		FormsModule,
		RouterModule,
		ShoppingListRoutingModule,
		SharedModule,
	],
	exports: [],
	declarations: [ShoppingListComponent, ShoppingEditComponent],
	providers: [],
})
export class ShoppingListModule {}
