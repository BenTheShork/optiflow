import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { Insights } from '../../classes/insights.class';

@Injectable({
    providedIn: 'root'
})
export class InsightsApiService extends DataApiService<Insights> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/insights', http, Insights);
    }

    // api/authenticates

    getInsights(user_id: number, token: string): Observable<Insights> {
        const params = {
            user_id,
            token
        };
        return this.getAllIns(params);
    }
}
