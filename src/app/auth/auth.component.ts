import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs'
import { AuthResponseData, AuthService } from '../shared/services/auth.service'

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	isLoginMode = true
	isLoading = false
	error!: string

	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

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
			},
			(errorMessage) => {
				console.log('error', errorMessage)
				this.error = errorMessage
				this.isLoading = false
			}
		)

		form.reset()
	}
}
