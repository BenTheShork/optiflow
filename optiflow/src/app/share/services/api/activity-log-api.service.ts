import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { ActivityLog } from '../../classes/activity-log.class';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogApiService extends DataApiService<ActivityLog> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/activitylog', http, ActivityLog);
    }

    // api/authenticates

    getActivities(): Observable<ActivityLog[]> {
        const params = {
            user_id: 4
        };
        return this.getAll(params);
    }
}
