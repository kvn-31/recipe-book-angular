import {
	Component,
	ComponentFactoryResolver,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder-directive/placeholder.directive'
import { AuthResponseData, AuthService } from '../shared/services/auth.service'

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
	isLoginMode = true
	isLoading = false
	error!: string | null
	@ViewChild(PlaceholderDirective, { static: false })
	alertHost!: PlaceholderDirective

	private closeSub!: Subscription

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit(): void {}

	ngOnDestroy() {
		if (this.closeSub) {
			this.closeSub.unsubscribe()
		}
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const email = form.value.email
		const password = form.value.password

		this.isLoading = true

		let obsAuth: Observable<AuthResponseData>

		if (this.isLoginMode) {
			obsAuth = this.authService.login(email, password)
		} else {
			obsAuth = this.authService.signup(email, password)
		}

		obsAuth.subscribe(
			(response) => {
				console.log(response)
				this.isLoading = false
				this.router.navigate(['/recipes'])
			},
			(errorMessage) => {
				console.log('error', errorMessage)
				this.error = errorMessage
				this.showErrorAlert(errorMessage)
				this.isLoading = false
			}
		)

		form.reset()
	}

	// onHandleError() {
	// 	this.error = null
	// }

	// dynamically / programmatically  create show alert component
	private showErrorAlert(errorMessage: string) {
		// which type the component is
		const alertCmpFactory =
			this.componentFactoryResolver.resolveComponentFactory(
				AlertComponent
			)
		// where to attach in dom (view container ref) -> see placeholder directive
		const hostViewContainerRef = this.alertHost.viewContainerRef
		// clears all angular components which ahve been created at this place before
		hostViewContainerRef.clear()

		const componentRef =
			hostViewContainerRef.createComponent(alertCmpFactory)

		// pass data into the component
		// access to the concrete instance
		componentRef.instance.message = errorMessage
		// only exception, where it is okay to subscribe to subscribe to any other than a subject
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe()
			hostViewContainerRef.clear()
		})
	}
}
