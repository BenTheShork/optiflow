import { Component, Input, ViewChild } from '@angular/core';
import { Process } from '@src/app/share/classes/process.class';
import { Version } from '@src/app/share/classes/version.class';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { catchError, map, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-version-data',
  templateUrl: './version-data.component.html',
  styleUrls: ['./version-data.component.scss']
})
export class VersionDataComponent extends UnsubscribeDirective {
  @Input() version: Version = new Version();
  @Input() processes: Process[] = [];
  @Input() canEdit = false;

  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(
    private versionApiService: VersionApiService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService
  ) { 
    super();
  }

  onValueChanged(e: { value: any; event: any; previousValue?: any }, field: string): void {
    if (this.version.id && e.event && this.validationGroup.instance.validate().isValid) {
        if (field === 'total_duration' || field === 'total_num_people') {
            return;
        } else {
          this.patchVersion(this.version);
        }
    }
  }

  private patchVersion(obj: Partial<Version>) {
    this.versionApiService.patchVersion(this.version.id, obj)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.notify('successfully saved', AlertType.Success, 5000)),
        catchError((error) => {
            this.errorHandleService.handleError(error, 'cannot update');
            return throwError(error);
        })
    ).subscribe();
  }

  postVersion(e: any) {
    e.preventDefault();
    this.versionApiService.postVersion(this.version)
    .pipe(
        takeUntil(this.unsubscribe$),
        map(data => this.version = data),
        catchError((error) => {
            this.errorHandleService.handleError(error,'cannot save');
            return throwError(error);
        })
    ).subscribe();
  }
}
