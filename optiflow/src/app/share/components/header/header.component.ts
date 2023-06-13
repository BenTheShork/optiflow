import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Language } from '../../classes/language.enum';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '@src/app/authorization/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public isMenuOpen = false;
  public selectedLanguage$ = new Observable<Language>();

  Language = Language;

  private unsubscribe$ = new Subject<void>();
   userName: string;
   lastName: string;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
	) {}

  setLanguage(language: Language) {
		this.languageService.setSelectedLanguage(language);
	}

  ngOnInit() {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage();
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
