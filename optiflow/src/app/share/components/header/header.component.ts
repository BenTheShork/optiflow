import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Language } from '../../classes/language.enum';
import { LanguageService } from '../../services/language.service';
import { DarkmodeService } from '../../../darkmode.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public isDarkMode:boolean = false;
  public isMenuOpen = false;
  public selectedLanguage$ = new Observable<Language>();

  Language = Language;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private languageService: LanguageService,
    private darkModeService: DarkmodeService
	) {
    this.darkModeService.getDarkMode().subscribe((value) => {
    this.isDarkMode = value;
  });
  }
  setDarkMode() {
    this.darkModeService.setDarkMode(this.isDarkMode);
  }
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
