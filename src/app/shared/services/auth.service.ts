import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { User } from '../models/user.model'

import { environment } from '../../../environments/environment'

export interface AuthResponseData {
	idToken: string
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
	key = environment.firebaseApiKey
	// subUser = new ReplaySubject<User>()
	subUser = new BehaviorSubject<User | null>(null)

	private tokenExpirationTimer: any

	constructor(private http: HttpClient, private router: Router) {}

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
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(
						resData.email,
						resData.localId,
						resData.idToken,
						+resData.expiresIn
					)
				})
			)
	}

	login(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
					this.key,
				{
					email: email,
					password: password,
					returnSecureToken: true,
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(
						resData.email,
						resData.localId,
						resData.idToken,
						+resData.expiresIn
					)
				})
			)
	}

	autoLogin() {
		const lsUserData = localStorage.getItem('userData')
		if (!lsUserData) {
			return
		}
		const userData: {
			email: string
			id: string
			_token: string
			_tokenExpirationDate: Date
		} = JSON.parse(lsUserData)

		const loadedUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate)
		)

		// now the loaded  data is (again) converted into a user object -> .token can be called and will return a NOT truthy result if the token expired
		if (loadedUser.token) {
			this.subUser.next(loadedUser)
			const expirationDuration =
				new Date(userData._tokenExpirationDate).getTime() -
				new Date().getTime()
			this.autoLogout(expirationDuration)
		}
	}

	logout() {
		this.subUser.next(null)
		this.router.navigate(['/authenticate'])
		localStorage.removeItem('userData')
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer)
		}
		this.tokenExpirationTimer = null
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout()
		}, expirationDuration)
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown Error occurred'
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage)
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email is already in use'
				break
			case 'INVALID_PASSWORD':
				errorMessage = 'Wrong Password or Account does not exist.'
				break
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'Wrong Password or Account does not exist.'
				break
		}
		return throwError(errorMessage)
	}

	private handleAuthentication(
		email: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expirationDate = new Date(
			new Date().getTime() + +expiresIn * 1000
		)
		const user = new User(email, userId, token, expirationDate)
		console.log(user)
		this.subUser.next(user)
		this.autoLogout(expiresIn * 1000)
		localStorage.setItem('userData', JSON.stringify(user))
	}
}
