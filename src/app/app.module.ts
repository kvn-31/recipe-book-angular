import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DropdownDirective } from './shared/dropdown.directive'
import { RecipeService } from './shared/services/recipe.service'
import { ShoppingListService } from './shared/services/shopping-list.service'
import { AuthComponent } from './auth/auth.component'
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component'
import { AuthInterceptorService } from './shared/services/auth-interceptor.service'
import { AlertComponent } from './shared/alert/alert.component'
import { PlaceholderDirective } from './shared/placeholder-directive/placeholder.directive'
import { RecipesModule } from './recipes/recipes.module'
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ShoppingEditComponent,
		ShoppingListComponent,
		DropdownDirective,
		AuthComponent,
		LoadingSpinnerComponent,
		AlertComponent,
		PlaceholderDirective,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RecipesModule,
	],
	providers: [
		ShoppingListService,
		RecipeService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
