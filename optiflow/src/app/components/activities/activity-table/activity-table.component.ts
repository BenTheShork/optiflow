import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@src/app/share/classes/activity.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { ActivityApiService } from '@src/app/share/services/api/activity-api.service';
import { DxDataGridComponent } from 'devextreme-angular';
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
  @Input() canEdit: boolean;

  @Output() refreshActivities = new EventEmitter();

  public confirmationVisible = false;
  selectedRows: number[] = [];
  selectionChangedBySelectbox: boolean;
  patternPositive = '^[1-9]+[0-9]*$';
  isEditing = false;
  
  private activityIdToDelete: string;

  constructor(
    private route: ActivatedRoute,
    private activityApiService: ActivityApiService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    if (!this.versionId) {
        this.versionId = this.route.snapshot.queryParamMap.get('versionId');
    }
  }
  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours === 0) {
        return `${minutes} min`;
    } else {
        return `${hours} h ${minutes} min`;
    }
  }

  onAddClick(): void {
    if (this.grid$) {
        this.grid$.instance.addRow();
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

  onCellPrepared(e: any) {
    if(e.data) {
      if (this.isEditing === false) {
        e.cellElement.style.cursor = 'pointer';
      }
    }
  }

  onRowInserting(e: any) {
    this.isEditing = false;
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
              this.alertService.success('alerts.successful-create');
              this.refreshActivities.emit();
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
    e.cancel = this.activityApiService
        .patchActivity(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-upate');
              this.refreshActivities.emit();
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
    this.activityIdToDelete = e.key;
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

  confirmActivityRemoval() {
    if (this.selectedRows.length > 0) {
      this.activityApiService
        .deleteActivities(this.selectedRows)
        .pipe(
            map(() => {
                this.alertService.success('alerts.successful-delete');
                this.refreshActivities.emit();
                return false;
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-delete', err);
                return of(true);
            })
        )
        .toPromise();
    } else {
      this.activityApiService
        .deleteActivity(this.activityIdToDelete)
        .pipe(
            map(() => {
                this.alertService.success('alerts.successful-delete');
                this.refreshActivities.emit();
                return false;
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-update', err);
                return of(true);
            })
        )
        .toPromise();
    }
  }
}
