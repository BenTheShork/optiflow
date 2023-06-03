import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@src/app/share/classes/project.class';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { LegalizationDatagridService } from '@src/app/share/services/legalization-data-grid.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss']
})
export class ProjectsOverviewComponent {

  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  public project$ = new Observable<Project[]>();
  public canEdit = false;
  public confirmationVisible = false;
  private projectIdToDelete: string;

  selectedRows: number[] = [];
  selectionChangedBySelectbox: boolean;

  constructor(
    private route: ActivatedRoute,
    private projectApiService: ProjectApiService,
    private readonly loadingService: LoadingScreenService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService,
    private readonly router: Router,
    private legalizationDatagridService: LegalizationDatagridService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  onCanEditChange(canEdit: boolean) {
    this.canEdit = canEdit;
  }

  hasSelectedRows(): boolean {
    return this.selectedRows.length > 0;
  }

  selectionChangedHandler() {
    if (!this.selectionChangedBySelectbox) {
    }

    this.selectionChangedBySelectbox = false;
  }

  deleteSelectedRows(): void {
    this.confirmationVisible = true;
  }

  redirectToDetails(e: any) {
    if (!e.column.name) {
      return;
    }
    this.router.navigate(['./', e.data.id], {
      relativeTo: this.route
    });
  }

  onAddClick(): void {
    if (this.grid$) {
        this.grid$.instance.addRow();
    }
  }

  onCellPrepared(e: {
      rowType: string;
      column: dxDataGridColumn;
      data: Project;
      cellElement: { classList: { add: (arg0: string) => void } };
  }) {
      this.legalizationDatagridService.onCellPrepared(e);
  }

  onRowInserting(e: any) {
    let newProject = new Project({
      name: e.data.name,
      description: e.data.description,
      user_id: 4
    });
    e.cancel = this.projectApiService.postProject(newProject)
      .pipe(
        map(item => {
          e.data = item;
          return false;
        }),
        tap(() => {
          this.alertService.notify('successfully saved', AlertType.Success, 5000);
          this.refreshData();
        }),
        catchError((err: any) => {
          this.errorHandleService.handleError(err, 'cannot save');
          return of(true);
        })
      ).toPromise();
  }

  onRowUpdating(e: any) {
    const mergedData = Object.assign({}, e.oldData, e.newData);
    e.cancel = this.projectApiService.patchProject(e.key, mergedData)
        .pipe(
            map(item => {
                e.newData = item;
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully saved', AlertType.Success, 5000);
              this.refreshData();
            }),
            catchError((err: any) => {
                this.errorHandleService.handleError(err, 'cannot update');
                return of(true);
            })
        ).toPromise();
  }

  onRowRemoving(e: any) {
    e.cancel = true;
    this.confirmationVisible = true;
    this.projectIdToDelete = e.key;
  }

  confirmProjectRemoval() {
    if (this.selectedRows.length > 0) {
      this.projectApiService.deleteProjects(this.selectedRows)
      .pipe(
          catchError((err: any) => {
              this.errorHandleService.handleError(err, 'cannot delete');
              return of(true);
          }),
          finalize(() => this.refreshData())
      ).toPromise();
    } else {
      this.projectApiService.deleteProject(this.projectIdToDelete)
      .pipe(
          catchError((err: any) => {
              this.errorHandleService.handleError(err, 'cannot delete');
              return of(true);
          }),
          finalize(() => this.refreshData())
      ).toPromise();
    }
  }

  private refreshData() {
    this.loadingService.startLoading();
    this.project$ = this.projectApiService.getProjects(4)
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
