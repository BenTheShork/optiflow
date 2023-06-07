import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Process } from '@src/app/share/classes/process.class';
import { VersionStatus } from '@src/app/share/classes/version-status.enum';
import { Version } from '@src/app/share/classes/version.class';
import { VERSION_STATUSES } from '@src/app/share/consts/version-status.const';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { AlertService } from '@src/app/share/services/alert.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { catchError, map, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-version-data',
  templateUrl: './version-data.component.html',
  styleUrls: ['./version-data.component.scss']
})
export class VersionDataComponent extends UnsubscribeDirective implements OnChanges {
  @Input() version: Version = new Version();
  @Input() processes: Process[] = [];
  @Input() canEdit = true;

  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;

  patternPositive = '^[1-9]+[0-9]*$';
  patternVersion = '^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$';
  versionString: string;
  readonly VERSION_STATUSES = VERSION_STATUSES;
  status: typeof VersionStatus = VersionStatus;

  constructor(
    private versionApiService: VersionApiService,
    private alertService: AlertService
  ) { 
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.versionString = this.getVersionString();
  }

  getVersionString(): string {
    return `${this.version.major}.${this.version.minor}.${this.version.patch}`;
  }

  parseVersionString(e: { value: any; event: any; previousValue?: any }): void {
    const parts = this.versionString.split('.');
    if (parts.length === 3) {
      this.version.major = parseInt(parts[0]);
      this.version.minor = parseInt(parts[1]);
      this.version.patch = parseInt(parts[2]);
    }
    if (this.version.id && e.event && this.validationGroup.instance.validate().isValid) {
      this.patchVersion(this.version);
    }
  }

  onValueChanged(e: { value: any; event: any; previousValue?: any }, field: string): void {
    if (this.version.id && e.event && this.validationGroup.instance.validate().isValid) {
        if (field === 'total_duration' || field === 'total_num_people') {
            return;
        } else {
          this.patchVersion(this.version);
        }
    }
  }

  private patchVersion(obj: Partial<Version>) {
    this.versionApiService.patchVersion(this.version.id, obj)
    .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.success('alerts.successful-update')),
        catchError((error) => {
          this.alertService.error('request-errors.cannot-delete', error);
            return throwError(error);
        })
    ).subscribe();
  }

  postVersion(e: any) {
    e.preventDefault();
    this.versionApiService.postVersion(this.version)
    .pipe(
        takeUntil(this.unsubscribe$),
        map(data => this.version = data),
        catchError((error) => {
            this.alertService.error('request-errors.cannot-save', error);
            return throwError(error);
        })
    ).subscribe();
  }
}
