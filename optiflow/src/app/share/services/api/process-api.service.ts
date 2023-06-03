import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { Process } from '../../classes/process.class';

@Injectable({
    providedIn: 'root'
})
export class ProcessApiService extends DataApiService<Process> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/process', http, Process);
    }

    // api/authenticates

    getProcesses(project_id: string, user_id: number): Observable<Process[]> {
        const params = {
            project_id,
            user_id
        };
        return this.getAll(params);
    }

    getProcess(id: string): Observable<Process> {
        return this.getOne(id);
    }

    patchProcess(id: string, process: Partial<Process>): Observable<Process> {
        return this.update(id, {}, '', process);
    }

    postProcess(process: Process): Observable<Process> {
        return this.create(process);
    }

    deleteProcess(id: string): Observable<void> {
        return this.deleteOne(id) as Observable<void>;
    }

    deleteProcesses(ids: number[]): Observable<void> {
        return this.deleteAll('', ids) as Observable<void>;
    }
}
