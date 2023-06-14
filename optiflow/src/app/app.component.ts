import { Component, OnInit } from '@angular/core';
import { environment } from '@src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './share/services/language.service';
import { loadMessages } from 'devextreme/localization';
import slMessages from 'devextreme/localization/messages/sl.json';
import { AuthService } from './authorization/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'optiflow';
  currentRoute: string;  
  environment = environment;
    constructor(
        private route: ActivatedRoute,
        public authService: AuthService,
        public router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        loadMessages(slMessages);

        this.translate.setDefaultLang(getLanguage());
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              const currentRoute = this.router.routerState.snapshot.root;
              this.currentRoute = this.getRoutePath(currentRoute);
              console.log(this.currentRoute);
              if(sessionStorage.getItem("log") == "false" || sessionStorage.getItem("log") == null || sessionStorage.getItem("log") == undefined){
                
                if(this.currentRoute != 'signup/' && this.currentRoute != 'signin/' && this.currentRoute != '/'){
                    sessionStorage.clear();
                    this.router.navigateByUrl('/signin')
                        .catch(err => console.error(err));
                }
              }
            }
          });

    }
    private getRoutePath(route: any): string {
        let path = '';
        while (route) {
          if (route.routeConfig && route.routeConfig.path) {
            path = `${route.routeConfig.path}/${path}`;
          }
          route = route.firstChild;
        }
        return path;
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
