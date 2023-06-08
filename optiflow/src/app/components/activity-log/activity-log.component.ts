import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityLog } from '@src/app/share/classes/activity-log.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { ActivityLogApiService } from '@src/app/share/services/api/activity-log-api.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit{
  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  public activity$ = new Observable<ActivityLog[]>();

  constructor(
    private route: ActivatedRoute,
    private activityLogApiService: ActivityLogApiService,
    private readonly loadingService: LoadingScreenService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  private refreshData() {
    this.loadingService.startLoading();
    this.activity$ = this.activityLogApiService.getActivities()
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
