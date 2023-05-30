import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Process } from '@src/app/share/classes/process.class';
import { Project } from '@src/app/share/classes/project.class';
import { PROCESS_STATUSES } from '@src/app/share/consts/process-status.conts';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Observable, catchError, map, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-process-data',
  templateUrl: './process-data.component.html',
  styleUrls: ['./process-data.component.scss']
})
export class ProcessDataComponent extends UnsubscribeDirective {
  @Input() process: Process = new Process();
  @Input() projects: Project[] = [];
  @Input() canEdit = false;

  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;
  readonly PROCESS_STATUSES = PROCESS_STATUSES;

  constructor(
    private processApiService: ProcessApiService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService
  ) { 
    super();
  }

  onValueChanged(e: { value: any; event: any; previousValue?: any }, field: string): void {
    if (this.process.id && e.event && this.validationGroup.instance.validate().isValid) {
        if (field === 'num_processes') {
            return;
        } else {
          this.patchProcess(this.process);
        }
    }
  }

  private patchProcess(obj: Partial<Process>) {
    this.processApiService.patchProcess(this.process.id, obj)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.notify('successfully saved', AlertType.Success, 5000)),
        catchError((error) => {
            this.errorHandleService.handleError(error, 'cannot update');
            return throwError(error);
        })
    ).subscribe();
  }

  postProcess(e: any) {
    e.preventDefault();
    this.processApiService.postProcess(this.process)
    .pipe(
        takeUntil(this.unsubscribe$),
        map(data => this.process = data),
        catchError((error) => {
            this.errorHandleService.handleError(error,'cannot save');
            return throwError(error);
        })
    ).subscribe();
  }
}
