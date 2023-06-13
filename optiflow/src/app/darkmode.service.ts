import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private darkModeSubject: BehaviorSubject<boolean>;
  public darkMode$: Observable<boolean>;

  constructor() {
    const isDarkModeEnabled = this.getInitialDarkModeValueFromLocalStorage();
    this.darkModeSubject = new BehaviorSubject<boolean>(isDarkModeEnabled);
    this.darkMode$ = this.darkModeSubject.asObservable();
  }

  getDarkMode(): Observable<boolean> {
    return this.darkMode$;
  }

  setDarkMode(value: boolean): void {
    this.darkModeSubject.next(value);
    this.updateDarkModeInLocalStorage(value);
  }

  private getInitialDarkModeValueFromLocalStorage(): boolean {
    const isDarkModeEnabled = localStorage.getItem('darkMode');
    return isDarkModeEnabled ? JSON.parse(isDarkModeEnabled) : false;
  }

  private updateDarkModeInLocalStorage(value: boolean): void {
    localStorage.setItem('darkMode', JSON.stringify(value));
    this.updateBodyClass(value);
  }

  private updateBodyClass(isDarkModeEnabled: boolean): void {
    
   
    if (isDarkModeEnabled) {
      let bglight = document.getElementsByClassName('bg-light');
      for(let i = 0; i < bglight.length; i++) {
        
          bglight[i].classList.add('dark-mode');
          bglight[i].classList.remove('bg-light');
      }
      
      console.log('dark mode enabled');
    } else {
      let bglight = document.getElementsByClassName('dark-mode');
      for(let i = 0; i < bglight.length; i++) {
        bglight[i].classList.add('bg-light');
        bglight[i].classList.remove('dark-mode');
      }
      console.log('dark disabled');
    }
  }
}