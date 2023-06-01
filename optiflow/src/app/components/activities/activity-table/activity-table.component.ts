import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '@src/app/share/classes/activity.class';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { ActivityApiService } from '@src/app/share/services/api/activity-api.service';
import { ErrorHandleService } from '@src/app/share/services/error-handle.service';
import { LegalizationDatagridService } from '@src/app/share/services/legalization-data-grid.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {
  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  @Input() activity: Activity[];
  @Input() versionId: string;

  @Output() refreshActivities = new EventEmitter();

  public confirmationVisible = false;
  
  private activityIdToDelete: string;

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private activityApiService: ActivityApiService,
    private errorHandleService: ErrorHandleService,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (!this.versionId) {
        this.versionId = this.route.snapshot.queryParamMap.get('versionId');
    }
  }

  onCellPrepared(e: {
    rowType: string;
    column: dxDataGridColumn;
    data: Activity;
    cellElement: { classList: { add: (arg0: string) => void } };
  }) {
    if(e.data) {
      this.legalizationDatagridService.onCellPrepared(e);
    }
  }

  onRowInserting(e: any) {
    let newActivity = new Activity ({
      name: e.data.name,
      description: e.data.description,
      process_version_id: parseInt(this.versionId),
      duration: e.data.duration,
      num_people: e.data.num_people
    });
    e.cancel = this.activityApiService
        .postActivity(newActivity)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully saved', AlertType.Success, 5000);
              this.refreshActivities.emit();
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
    e.cancel = this.activityApiService
        .patchActivity(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.notify('successfully updated', AlertType.Success, 5000);
              this.refreshActivities.emit();
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
    this.activityIdToDelete = e.key;
  }

  onEditorPreparing(e: any) {
    if (e.dataField === 'description' && e.parentType === 'dataRow') {
        e.editorName = 'dxTextArea';
        e.editorOptions.height = 100;
    }
  }

  confirmActivityRemoval() {
    this.activityApiService
        .deleteActivity(this.activityIdToDelete)
        .pipe(
            map(() => {
                this.refreshActivities.emit();
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
