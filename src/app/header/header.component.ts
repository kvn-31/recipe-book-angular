import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { DataStorageService } from '../shared/services/data-storage.service'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
	collapsed = true
	private subUser!: Subscription
	isAuthenticated = false

	constructor(
		private dataStorageService: DataStorageService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.subUser = this.authService.subUser.subscribe((user) => {
			this.isAuthenticated = !!user
		})
	}

	ngOnDestroy() {
		this.subUser.unsubscribe()
	}

	onLogout() {
		this.authService.logout()
	}

	onSaveData() {
		this.dataStorageService.storeRecipes()
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe()
	}
}
