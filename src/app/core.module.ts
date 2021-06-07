import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AuthInterceptorService } from './shared/services/auth-interceptor.service'
import { RecipeService } from './shared/services/recipe.service'
import { ShoppingListService } from './shared/services/shopping-list.service'

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		ShoppingListService,
		RecipeService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
})
export class CoreModule {}
