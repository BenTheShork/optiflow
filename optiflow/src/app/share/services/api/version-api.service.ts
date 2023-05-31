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
        super(environment.api + '/version', http, Version);
    }

    // api/authenticates

    getVersions(process_id: string): Observable<Version[]> {
        const params = {
            process_id
        };
        return this.getAll(params);
    }

    getVersion(id: string): Observable<Version> {
        return this.getOne(id);
    }

    patchVersion(id: string, version: Partial<Version>): Observable<Version> {
        return this.update(id, {}, '', version);
    }

    postVersion(version: Version): Observable<Version> {
        return this.create(version);
    }

    deleteVersion(id: string): Observable<void> {
        return this.deleteOne(id) as Observable<void>;
    }
}
