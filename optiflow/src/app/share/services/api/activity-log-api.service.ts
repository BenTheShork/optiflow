import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { ActivityLog } from '../../classes/activity-log.class';
import { ActivityLogPagination } from '../../classes/pagination-activity-log.class';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogApiService extends DataApiService<ActivityLogPagination> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/activitylog', http, ActivityLogPagination);
    }

    // api/authenticates

    getActivities(page: number): Observable<ActivityLogPagination> {
        const params = {
            page: page,
            user_id: 4
        };
        return this.getOnePaginated(undefined,'',params);
    }
}
