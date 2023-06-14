import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityLogPagination } from '@src/app/share/classes/pagination-activity-log.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { ActivityLogApiService } from '@src/app/share/services/api/activity-log-api.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Observable, finalize, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent {
  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;
  dataSource: any = {};

  public activity$ = new Observable<ActivityLogPagination>();
  currentPage: number = 1;
  username = sessionStorage.getItem('username');

  constructor(
    private route: ActivatedRoute,
    private activityLogApiService: ActivityLogApiService,
    private readonly loadingService: LoadingScreenService,
    httpClient: HttpClient
  ) {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }
    this.dataSource = new CustomStore({
      key: 'id',
      load(loadOptions: any) {
        let body: any = { };
        [
          'take',
          'skip',
          'sort',
          'filter',
          'group',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            body[i] = loadOptions[i];
          }
        });
        body.user_id = sessionStorage.getItem('userid');
        body.token = sessionStorage.getItem('token');
        return lastValueFrom(
          httpClient.post('https://staging.gpc-hosting.com/api/activitylog', body)
        ).then((data: any) => ({
            data: data.data,
            totalCount: data.total,
          }))
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
  }

  private refreshData() {
    this.loadingService.startLoading();
    this.activity$ = this.activityLogApiService.getActivities(this.currentPage)
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
