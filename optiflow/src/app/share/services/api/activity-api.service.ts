import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { Activity } from '../../classes/activity.class';

@Injectable({
    providedIn: 'root'
})
export class ActivityApiService extends DataApiService<Activity> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/activity', http, Activity);
    }

    // api/authenticates

    getActivities(process_version_id: string): Observable<Activity[]> {
        const params = {
            process_version_id
        };
        return this.getAll(params);
    }

    getActivity(id: string): Observable<Activity> {
        return this.getOne(id);
    }

    patchActivity(id: string, activity: Partial<Activity>): Observable<Activity> {
        activity.user_id =4;
        return this.update(id, {}, '', activity);
    }

    postActivity(activity: Activity): Observable<Activity> {
        activity.user_id =4;
        return this.create(activity);
    }

    deleteActivity(id: string): Observable<void> {
        const params = {
            user_id: 4
        }
        return this.deleteOne(id, '', params) as Observable<void>;
    }

    deleteActivities(ids: number[]): Observable<void> {
        const params = {
            ids: ids,
            user_id: 4
        }
        return this.deleteAll('', params) as Observable<void>;
    }
}
