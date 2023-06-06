import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@src/app/share/classes/project.class';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService } from '@src/app/share/services/alert.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { catchError, finalize, takeUntil, tap, throwError } from 'rxjs';

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
        }
    }
  }

  private patchProject(obj: Partial<Project>) {
    this.projectApiService.patchProject(this.project.id, obj)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.success('alerts.successful-updated')),
        catchError((error) => {
            this.alertService.error('request-errors.cannot-update', error);
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
          this.alertService.success('alerts.successful-create');
          this.router.navigate(['/project']);
        }),
        catchError((error) => {
            this.alertService.error('request-errors.cannot-save', error);
            return throwError(error);
        })
    ).subscribe();
  }
}
