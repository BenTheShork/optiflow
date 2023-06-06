import { Injectable, OnDestroy } from "@angular/core";
import { Language } from "../classes/language.enum";
import { BehaviorSubject, Observable, Subject, finalize, takeUntil } from "rxjs";
import { locale } from "devextreme/localization";
import { registerLocaleData } from "@angular/common";
import { StorageKeys } from "../classes/storage-keys.enum";
import { TranslateService } from '@ngx-translate/core';

import localeSl from '@angular/common/locales/sl';
import localeEn from '@angular/common/locales/en';
import localeSlExtra from '@angular/common/locales/extra/sl';
import localeEnExtra from '@angular/common/locales/extra/en';

export const getLanguage = () => (localStorage.getItem(StorageKeys.SELECTED_LANGUAGE) || Language.EN) as Language;

@Injectable({
    providedIn: 'root'
})
export class LanguageService implements OnDestroy {

    selectedLanguage = new BehaviorSubject<Language>(Language.EN);

    private unsubscribe$ = new Subject<void>();

    constructor(private translate: TranslateService) {
        // Get language from localStorage and update the service selectedLanguage var
        this.selectedLanguage.next(
            getLanguage()
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    initialize(): Language {
        const language = getLanguage();
        this.registerLocale(language);
        return language;
    }

    getSelectedLanguage(): Observable<Language> {
        return this.selectedLanguage;
    }

    setSelectedLanguage(language: Language) {
        this.selectedLanguage.next(language as Language);
        this.translate.use(language)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.setLocale(language as Language);
                    window.location.reload();
                })
            ).subscribe();
    }

    private setLocale(language: Language) {
        localStorage.setItem(StorageKeys.SELECTED_LANGUAGE, language);
    }

    private registerLocale(language: Language) {
        locale(language);
        switch (language) {
            case Language.SL:
                registerLocaleData(localeSl, Language.SL, localeSlExtra);
                break;
            case Language.EN:
            default:
                registerLocaleData(localeEn, Language.EN, localeEnExtra);
                break;
        }

    }
}