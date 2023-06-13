import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export enum AlertType {
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Success = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private options = {enableHtml: true, positionClass: 'toast-bottom-right'};

  constructor(
    private toastr: ToastrService, 
    private translate: TranslateService,
    private router: Router
    ) { }

    success(message: string): void {
      this.toastr.success(
          this.generateHTMLmessage(this.translate.instant(message), 'success'),
          null,
          this.options
      );
    }

    error(message: string, error: any): void {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.router.navigate(['/logout']);
                this.toastr.error(
                    this.generateHTMLmessage(this.translate.instant(message), 'danger'),
                    null,
                    this.options
                );
            } else if (error.status === 409) {
                this.toastr.error(
                    this.generateHTMLmessage(this.translate.instant(error.statusText), 'danger'),
                    null,
                    this.options
                );
            } else {
                console.error('error: ' + (message || 'NULL'));
                console.error(error);
                this.toastr.error(
                    this.generateHTMLmessage(this.translate.instant(message), 'danger'),
                    null,
                    this.options
                );
            }
        } else {
            this.toastr.error(
                this.generateHTMLmessage(this.translate.instant(message), 'danger'),
                null,
                this.options
            );
        }
    }

    info(message: string): void {
        this.toastr.info(
            this.generateHTMLmessage(this.translate.instant(message), 'info'),
            null,
            this.options
        );
    }

    warn(message: string): void {
        this.toastr.warning(
            this.generateHTMLmessage(this.translate.instant(message), 'warning'),
            null,
            this.options
        );
    }

    clear(): void {
        this.toastr.clear();
    }

    private generateHTMLmessage(message: string, type: string): string {
      return `
          <div class="d-flex">
              <img src="${this.getIconImage(type)}" width="20px" height="20px">
              ${message}
          </div>
      `;
    }

    private getIconImage(type: string): string {
      switch(type) {
          case 'success':
              return '/assets/icons/icon_success.svg';
          case 'danger':
              return '/assets/icons/icon_danger.svg';
          case 'info':
              return '/assets/icons/icon_info.svg';
          case 'warning':
              return '/assets/icons/icon_warning.svg';
          default:
              return '/assets/icons/icon_danger.svg';
      }
  }
}