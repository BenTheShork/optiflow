import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './share/services/language.service';
import { loadMessages } from 'devextreme/localization';
import slMessages from 'devextreme/localization/messages/sl.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'optiflow';

  environment = environment;
    constructor(
        public router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        loadMessages(slMessages);

        this.translate.setDefaultLang(getLanguage());
    }

    isHeaderVisible (): boolean {
        if (this.router.url === '/signin') return false;
        else if (this.router.url === '/signup') return false;
        else return true;
    }

    /*ngOnInit(): void {
        if (this.router.url === '/') {
            this.router.navigateByUrl('/signin')
                .catch(err => console.error(err));
        }
    }

    ngAfterViewInit(): void {
        const loadingElement = document.getElementById('appSplashScreen');
        loadingElement.remove();
    }*/
}
