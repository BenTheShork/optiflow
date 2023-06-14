import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessStatus } from '@src/app/share/classes/process-status.enum';
import { Process } from '@src/app/share/classes/process.class';
import { PROCESS_STATUSES } from '@src/app/share/consts/process-status.const';
import { AlertService } from '@src/app/share/services/alert.service';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { LegalizationDatagridService } from '@src/app/share/services/legalization-data-grid.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-processes-table',
  templateUrl: './processes-table.component.html',
  styleUrls: ['./processes-table.component.scss']
})
export class ProcessesTableComponent implements OnInit {

  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  @Input() process: Process[];
  @Input() projectId: string;

  @Output() refreshProcesses = new EventEmitter();

  patternVersion = '^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$';
  public confirmationVisible = false;
  public ProcessCategory = ProcessStatus;

  editorOptions = {
    itemTemplate: 'processItemTemplate',
    fieldTemplate: 'processFieldTemplate'
  };

  readonly PROCESS_STATUSES = PROCESS_STATUSES;

  private processIdToDelete: string;
  selectedRows: number[] = [];
  selectionChangedBySelectbox: boolean;
  isEditing = false;

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private processApiService: ProcessApiService,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (!this.projectId) {
        this.projectId = this.route.snapshot.queryParamMap.get('id');
    }
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

  redirectToDetails(event: any): void {
    if (this.isEditing === false) {
      if (!event.column.name) {
        return;
      }
      this.router.navigate(['./', event.data.id], {
        relativeTo: this.route
    });}
  }

  onRowInserting(e: any) {
    this.isEditing = false;
    let newProcess = new Process ({
      name: e.data.name,
      description: e.data.description,
      project_id: parseInt(this.projectId),
      status: e.data.status,
      best_version: e.data.best_version
    });
    e.cancel = this.processApiService
        .postProcess(newProcess)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-create');
              this.refreshProcesses.emit();
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-save', err);
                return of(true);
            })
        )
        .toPromise();
  }

  onRowUpdating(e: any) {
    this.isEditing = false;
    const mergedData = Object.assign({}, e.oldData, e.newData);
    e.cancel = this.processApiService
        .patchProcess(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-update');
              this.refreshProcesses.emit();
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
    this.processIdToDelete = e.key;
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

  cancelHandler() {
    this.isEditing = false;
  }

  public onGridContentReady(): void {
    // Check if the "Save" button was clicked without making any changes
    const saveButton = document.querySelector('.dx-link-save');
    saveButton?.addEventListener('click', () => {
      this.isEditing = false;
    });
  }

  confirmProcessRemoval() {
    if (this.selectedRows.length > 0) {
      this.processApiService
      .deleteProcesses(this.selectedRows)
      .pipe(
          map(() => {
              this.alertService.success('alerts.successful-delete')
              this.refreshProcesses.emit();
              return false;
          }),
          catchError((err: any) => {
              this.alertService.error('request-errors.cannot-delete', err);
              return of(true);
          })
      ).toPromise();
    } else {
      this.processApiService
      .deleteProcess(this.processIdToDelete)
      .pipe(
          map(() => {
              this.alertService.success('alerts.successful-delete')
              this.refreshProcesses.emit();
              return false;
          }),
          catchError((err: any) => {
              this.alertService.error('request-errors.cannot-delete', err);
              return of(true);
          })
      ).toPromise();
    }
  }

}
