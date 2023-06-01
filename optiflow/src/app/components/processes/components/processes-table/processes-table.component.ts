import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessStatus } from '@src/app/share/classes/process-status.enum';
import { Process } from '@src/app/share/classes/process.class';
import { PROCESS_STATUSES } from '@src/app/share/consts/process-status.conts';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
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

  public confirmationVisible = false;
  public ProcessCategory = ProcessStatus;

  editorOptions = {
    itemTemplate: 'processItemTemplate',
    fieldTemplate: 'processFieldTemplate'
  };

  readonly PROCESS_STATUSES = PROCESS_STATUSES;

  private processIdToDelete: string;
  private urlDetail = '/project/';

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private processApiService: ProcessApiService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (!this.projectId) {
        this.projectId = this.route.snapshot.queryParamMap.get('id');
    }
  }

  onCellPrepared(e: {
    rowType: string;
    column: dxDataGridColumn;
    data: Process;
    cellElement: { classList: { add: (arg0: string) => void } };
  }) {
    if(e.data) {
      this.legalizationDatagridService.onCellPrepared(e);
    }
  }

  redirectToDetails(event: any): void {
    this.router.navigate(['./', event.data.id], {
      relativeTo: this.route
  });
  }

  onRowInserting(e: any) {
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
              this.alertService.notify('successfully saved', AlertType.Success, 5000);
              this.refreshProcesses.emit();
            }),
            catchError((err: any) => {
                this.errorHandleService.handleError(
                    err,
                    'cannot save'
                );
                return of(true);
            })
        )
        .toPromise();
  }

  onRowUpdating(e: any) {
    const mergedData = Object.assign({}, e.oldData, e.newData);
    e.cancel = this.processApiService
        .patchProcess(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully updated', AlertType.Success, 5000);
              this.refreshProcesses.emit();
            }),
            catchError((err: any) => {
                this.errorHandleService.handleError(
                    err,
                    'cannot update'
                );
                return of(true);
            })
        ).toPromise();
  }

  onRowRemoving(e: any) {
    e.cancel = true;
    this.confirmationVisible = true;
    this.processIdToDelete = e.key;
  }

  onEditorPreparing(e: any) {
    if (e.dataField === 'description' && e.parentType === 'dataRow') {
        e.editorName = 'dxTextArea';
        e.editorOptions.height = 100;
    }
  }

  confirmProcessRemoval() {
    this.processApiService
        .deleteProcess(this.processIdToDelete)
        .pipe(
            map(() => {
                this.refreshProcesses.emit();
                return false;
            }),
            catchError((err: any) => {
                this.errorHandleService.handleError(
                    err,
                    'cannot delete'
                );
                return of(true);
            })
        )
        .toPromise();
  }

}
