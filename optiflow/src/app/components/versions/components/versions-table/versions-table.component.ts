import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Version } from '@src/app/share/classes/version.class';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { LegalizationDatagridService } from '@src/app/share/services/legalization-data-grid.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-versions-table',
  templateUrl: './versions-table.component.html',
  styleUrls: ['./versions-table.component.scss']
})
export class VersionsTableComponent implements OnInit {

  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  @Input() version: Version[];
  @Input() processId: string;

  @Output() refreshVersions = new EventEmitter();

  public confirmationVisible = false;
  
  private versionIdToDelete: string;

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private versionApiService: VersionApiService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (!this.processId) {
        this.processId = this.route.snapshot.queryParamMap.get('processId');
    }
  }

  onCellPrepared(e: {
    rowType: string;
    column: dxDataGridColumn;
    data: Version;
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
    let newVersion = new Version ({
      major: e.data.major,
      minor: e.data.minor,
      patch: e.data.patch,
      description: e.data.description,
      process_id: parseInt(this.processId),
      grade: e.data.grade,
      total_num_people: 0,
      total_duration: 0
    });
    console.log(newVersion);
    e.cancel = this.versionApiService
        .postVersion(newVersion)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully saved', AlertType.Success, 5000);
              this.refreshVersions.emit();
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
    e.cancel = this.versionApiService
        .patchVersion(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully updated', AlertType.Success, 5000);
              this.refreshVersions.emit();
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
    this.versionIdToDelete = e.key;
  }

  onEditorPreparing(e: any) {
    if (e.dataField === 'description' && e.parentType === 'dataRow') {
        e.editorName = 'dxTextArea';
        e.editorOptions.height = 100;
    }
  }

  confirmProcessRemoval() {
    this.versionApiService
        .deleteVersion(this.versionIdToDelete)
        .pipe(
            map(() => {
                this.refreshVersions.emit();
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
