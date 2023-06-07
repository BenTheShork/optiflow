import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionStatus } from '@src/app/share/classes/version-status.enum';
import { Version } from '@src/app/share/classes/version.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import { LegalizationDatagridService } from '@src/app/share/services/legalization-data-grid.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-versions-table',
  templateUrl: './versions-table.component.html',
  styleUrls: ['./versions-table.component.scss']
})
export class VersionsTableComponent implements OnInit, OnChanges {

  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  @Input() version: Version[];
  @Input() processId: string;

  @Output() refreshVersions = new EventEmitter();

  public confirmationVisible = false;
  selectedRows: number[] = [];
  selectionChangedBySelectbox: boolean;
  isEditing = false;
  patternPositive = '^[1-9]+[0-9]*$';
  patternVersion = '^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$';
  formattedVersions: Version[];
  
  private versionIdToDelete: string;

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private versionApiService: VersionApiService,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.version && this.version) {
      this.formattedVersions = this.version.map(v => ({
        ...v,
        formattedVersion: `${v.major}.${v.minor}.${v.patch}`,
      }));
    }
  }

  ngOnInit() {
    if (!this.processId) {
        this.processId = this.route.snapshot.queryParamMap.get('processId');
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
      });
    }
  }

  parseVersionString(versionString: string, version: Version): void {
    const parts = versionString.split('.');
    if (parts.length === 3) {
      version.major = parseInt(parts[0]);
      version.minor = parseInt(parts[1]);
      version.patch = parseInt(parts[2]);
    }
  }

  onRowInserting(e: any) {
    this.isEditing = false;
    let newVersion = new Version ({
      description: e.data.description,
      process_id: parseInt(this.processId),
      grade: e.data.grade,
      total_num_people: 0,
      total_duration: 0,
      status: VersionStatus.Inactive
    });
    this.parseVersionString(e.data.formattedVersion,newVersion);
    e.cancel = this.versionApiService
        .postVersion(newVersion)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-create');
              this.refreshVersions.emit();
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
    e.cancel = this.versionApiService
        .patchVersion(e.key, mergedData)
        .pipe(
            map((item) => {
                return false;
            }),
            tap(() => {
              this.alertService.success('alerts.successful-update');
              this.refreshVersions.emit();
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
    this.versionIdToDelete = e.key;
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

  confirmProcessRemoval() {
    if (this.selectedRows.length > 0) {
      this.versionApiService
        .deleteVersions(this.selectedRows)
        .pipe(
            map(() => {
                this.alertService.success('alerts.successful-delete')
                this.refreshVersions.emit();
                return false;
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-delete', err);
                return of(true);
            })
        )
        .toPromise();
    } else {
      this.versionApiService
        .deleteVersion(this.versionIdToDelete)
        .pipe(
            map(() => {
                this.alertService.success('alerts.successful-delete')
                this.refreshVersions.emit();
                return false;
            }),
            catchError((err: any) => {
                this.alertService.error('request-errors.cannot-delete', err);
                return of(true);
            })
        )
        .toPromise();
    }
  }

}
