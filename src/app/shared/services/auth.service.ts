import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export interface AuthResponseData {
	idtoken: string
	email: string
	refreshToken: string
	expiresIn: string
	localId: string
	registered?: boolean
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	key = 'AIzaSyDIg5xbh208jdzdMNfbhDUakLQymseC5iM'
	constructor(private http: HttpClient) {}

	signup(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
					this.key,
				{
					email: email,
					password: password,
					returnSecureToken: true,
				}
			)
			.pipe(
				catchError((errorRes) => {
					let errorMessage = 'An unknown Error occurred'
					if (!errorRes.error || !errorRes.error.error) {
						return throwError(errorMessage)
					}
					switch (errorRes.error.error.message) {
						case 'EMAIL_EXISTS':
							errorMessage = 'This email is already in use'
					}
					return throwError(errorMessage)
				})
			)
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
				this.key,
			{
				email: email,
				password: password,
				returnSecureToken: true,
			}
		)
	}
}
