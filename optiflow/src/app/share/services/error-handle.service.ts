import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService, AlertType } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

    constructor(
        private router: Router,
        private alertService: AlertService
    ) { }

    handleError(err: any, message: string) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.router.navigate(['/logout']);
                this.alertService.notify(message, AlertType.Warning);
            } else {
                console.error('error: ' + (message || 'NULL'));
                console.error(err);
                this.alertService.notify(message, AlertType.Error);
            }
        } else {
            this.alertService.notify(message, AlertType.Error, 2000);
            console.error(err, err instanceof Error);
        }
    }
}
