import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component'
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipesRoutingModule } from './recipes-routing.module'
import { RecipesComponent } from './recipes.component'

@NgModule({
	imports: [
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		SharedModule,
		RecipesRoutingModule,
	],
	exports: [],
	declarations: [
		RecipesComponent,
		RecipeListComponent,
		RecipeItemComponent,
		RecipeEditComponent,
		RecipeDetailComponent,
		RecipeStartComponent,
	],
	providers: [],
})
export class RecipesModule {}
