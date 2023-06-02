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
        return this.update(id, {}, '', activity);
    }

    postActivity(activity: Activity): Observable<Activity> {
        return this.create(activity);
    }

    deleteActivity(id: string): Observable<void> {
        return this.deleteOne(id) as Observable<void>;
    }
}
