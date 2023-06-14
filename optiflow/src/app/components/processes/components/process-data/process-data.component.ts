import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Process } from '@src/app/share/classes/process.class';
import { Project } from '@src/app/share/classes/project.class';
import { PROCESS_STATUSES } from '@src/app/share/consts/process-status.const';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService } from '@src/app/share/services/alert.service';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Observable, catchError, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-process-data',
  templateUrl: './process-data.component.html',
  styleUrls: ['./process-data.component.scss']
})
export class ProcessDataComponent extends UnsubscribeDirective {
  @Input() process: Process = new Process();
  @Input() canEdit = false;

  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;

  public projects$ = new Observable<Project[]>();
  readonly PROCESS_STATUSES = PROCESS_STATUSES;

  constructor(
    private processApiService: ProcessApiService,
    private projectApiService: ProjectApiService,
    private alertService: AlertService,
    private readonly router: Router
  ) { 
    super();
    this.projects$ = this.projectApiService.getProjects(Number(sessionStorage.getItem('userid')), sessionStorage.getItem('token'));
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
        tap(() => this.alertService.success('alerts.successful-update')),
        catchError((error) => {
            this.alertService.error('request-errors.cannot-update', error);
            return throwError(error);
        })
    ).subscribe();
  }

  postProcess(e: any) {
    e.preventDefault();
    this.processApiService.postProcess(this.process)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.alertService.success('alerts.successful-create');
          this.router.navigate(['/project/' + this.process.project_id]);
        }),
        catchError((error) => {
            this.alertService.error('request-errors.cannot-save', error);
            return throwError(error);
        })
    ).subscribe();
  }
}
