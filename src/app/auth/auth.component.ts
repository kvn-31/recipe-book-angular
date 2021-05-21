import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	isLoginMode = true

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

		if (this.isLoginMode) {
		} else {
			this.authService.signup(email, password).subscribe(
				(response) => {
					console.log(response)
				},
				(error) => {
					console.log('error', error)
				}
			)
		}

		form.reset()
	}
}