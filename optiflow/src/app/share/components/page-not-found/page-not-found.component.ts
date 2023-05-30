import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements AfterViewInit{
  period = 60;
  maxValue = 60;
  intervalId: NodeJS.Timeout | undefined;

  constructor(
      private router: Router
  ) { }

  ngAfterViewInit() {
      this.intervalId = setInterval(() => this.timer(), 100);
  }

  timer() {
      this.period--;
      if (this.period === 0 && this.intervalId) {
          clearInterval(this.intervalId);
          this.router.navigate(['/project']);
          return;
      }
  }
}
