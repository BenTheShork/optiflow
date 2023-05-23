import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'optiflow';

  environment = environment;
    constructor(
        public router: Router,
    ) { }

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
