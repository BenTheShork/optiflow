import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Language } from '../../classes/language.enum';
import { LanguageService } from '../../services/language.service';

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

  constructor(
    private languageService: LanguageService
	) {}
  ngOnInit(): void {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage();
  }

  setLanguage(language: Language) {
		this.languageService.setSelectedLanguage(language);
	}

  toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

  logout(): void {
  }

}
