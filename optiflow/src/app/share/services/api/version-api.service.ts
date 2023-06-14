import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { Version } from '../../classes/version.class';

@Injectable({
    providedIn: 'root'
})
export class VersionApiService extends DataApiService<Version> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/processversion', http, Version);
    }

    // api/authenticates

    getVersions(process_id: string, user_id: number, token: string): Observable<Version[]> {
        const params = {
            process_id,
            user_id,
            token
        };
        return this.getAll(params);
    }

    getVersion(id: string): Observable<Version> {
        return this.getOne(id);
    }

    patchVersion(id: string, version: Partial<Version>): Observable<Version> {
        version.user_id=Number(sessionStorage.getItem('userid'));
        version.token = sessionStorage.getItem('token');
        return this.updateVers(id, version, '');
    }

    postVersion(version: Version): Observable<Version> {
        version.user_id=Number(sessionStorage.getItem('userid'));
        version.token = sessionStorage.getItem('token');
        return this.create(version);
    }

    deleteVersion(id: string): Observable<void> {
        const params = {
            user_id: Number(sessionStorage.getItem('userid')),
            token: sessionStorage.getItem('token')
        }
        return this.deleteOne(id, '', params) as Observable<void>;
    }

    deleteVersions(ids: number[]): Observable<void> {
        const params = {
            ids: ids,
            user_id: Number(sessionStorage.getItem('userid')),
            token: sessionStorage.getItem('token')
        }
        return this.deleteAll('', params) as Observable<void>;
    }
}
