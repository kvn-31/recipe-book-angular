import { Injectable } from '@angular/core'
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { AuthService } from '../shared/services/auth.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		// return a truthy value if there is a user, else a falsy value
		return this.authService.subUser.pipe(
			// take in order to only take one, and not ongoing subscription
			take(1),
			map((user) => {
				const isAuth = !!user
				if (isAuth) {
					return true
				}
				return this.router.createUrlTree(['/authenticate'])
			})
		)
	}
}
