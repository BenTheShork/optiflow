import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@src/app/share/classes/project.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
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
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private projectApiService: ProjectApiService,
    private readonly loadingService: LoadingScreenService,
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
    if (this.isEditing === false) {
      if (!e.column.name) {
        return;
      }
      this.router.navigate(['./', e.data.id], {
        relativeTo: this.route
      });
    }
  }

  onAddClick(): void {
    if (this.grid$) {
        this.grid$.instance.addRow();
    }
  }

  onCellPrepared(e: any) {
      //this.legalizationDatagridService.onCellPrepared(e);
      if(e.data) {
        if (this.isEditing === false) {
          e.cellElement.style.cursor = 'pointer';
        }
      }
  }

  onRowInserting(e: any) {
    this.isEditing = false;
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
          this.alertService.success('alerts.successful-create');
          this.refreshData();
        }),
        catchError((err: any) => {
          this.alertService.error('request-errors.cannot-save', err);
          return of(true);
        })
      ).toPromise();
  }

  onRowUpdating(e: any) {
    this.isEditing = false;
    const mergedData = Object.assign({}, e.oldData, e.newData);
    e.cancel = this.projectApiService.patchProject(e.key, mergedData)
        .pipe(
            map(item => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-update');
              this.refreshData();
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-update', err);
                return of(true);
            })
        ).toPromise();
  }

  onRowRemoving(e: any) {
    this.isEditing = false;
    e.cancel = true;
    this.confirmationVisible = true;
    this.projectIdToDelete = e.key;
  }

  cancelHandler() {
    this.isEditing = false;
  }

  onEditorPreparing(e: any) {
    if (e.parentType === 'dataRow' && (e.editorName === 'dxTextBox' || e.editorName === 'dxNumberBox')) {
      this.isEditing = true;
    }
    if (e.dataField === 'description' && e.parentType === 'dataRow') {
        e.editorName = 'dxTextArea';
        e.editorOptions.height = 100;
    }
  }

  confirmProjectRemoval() {
    if (this.selectedRows.length > 0) {
      this.projectApiService.deleteProjects(this.selectedRows)
      .pipe(
          catchError((err: any) => {
              this.alertService.error('request-errors.cannot-delete', err);
              return of(true);
          }),
          finalize(() => this.refreshData())
      ).toPromise();
    } else {
      this.projectApiService.deleteProject(this.projectIdToDelete)
      .pipe(
          catchError((err: any) => {
              this.alertService.error('request-errors.cannot-delete', err);
              return of(true);
          }),
          finalize(() => this.refreshData())
      ).toPromise();
    }
  }

  public onGridContentReady(): void {
    // Check if the "Save" button was clicked without making any changes
    const saveButton = document.querySelector('.dx-link-save');
    saveButton?.addEventListener('click', () => {
      this.isEditing = false;
    });
  }

  private refreshData() {
    this.loadingService.startLoading();
    this.project$ = this.projectApiService.getProjects(4)
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
