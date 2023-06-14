import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../authorization/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isMenuOpen = false;

  private unsubscribe$ = new Subject<void>();
   userName: string;
   lastName: string;

  constructor(private readonly router: Router, private authService: AuthService
	) {}

  ngOnInit() {
    // Retrieve values from session storage
    if(sessionStorage.getItem('username') != null && sessionStorage.getItem('username')){
      this.userName = sessionStorage.getItem('username');
    }
   
  }
  toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

  logout(): void {
    this.authService.logout();
  }

}
