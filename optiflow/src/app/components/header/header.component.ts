import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isMenuOpen = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
	) {}

  toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

  logout(): void {
  }

}
