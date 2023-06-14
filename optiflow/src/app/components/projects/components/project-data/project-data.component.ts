import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@src/app/share/classes/project.class';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { catchError, finalize, map, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-project-data',
  templateUrl: './project-data.component.html',
  styleUrls: ['./project-data.component.scss']
})
export class ProjectDataComponent  extends UnsubscribeDirective {
  @Input() project: Project = new Project();
  @Input() canEdit = false;

  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(
    private projectApiService: ProjectApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService
  ) { 
    super();
  }

  onValueChanged(e: { value: any; event: any; previousValue?: any }, field: string): void {
    if (this.project.id && e.event && this.validationGroup.instance.validate().isValid) {
        if (field === 'num_processes') {
            return;
        } else {
          this.patchProject(this.project);
          //this.patchRegulation({[field]: e.value});
        }
    }
  }

  private patchProject(obj: Partial<Project>) {
    this.projectApiService.patchProject(this.project.id, obj)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.notify('successfully saved', AlertType.Success, 5000)),
        catchError((error) => {
            this.errorHandleService.handleError(error, 'cannot update');
            return throwError(error);
        })
    ).subscribe();
  }

  postProject(e: any) {
    e.preventDefault();
    this.projectApiService.postProject(this.project)
    .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.alertService.notify('successfully saved', AlertType.Success, 5000);
          this.router.navigate(['/project']);
        }),
        catchError((error) => {
            this.errorHandleService.handleError(error,'cannot save');
            return throwError(error);
        })
    ).subscribe();
  }
}
