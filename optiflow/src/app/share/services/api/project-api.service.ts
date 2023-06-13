import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { Project } from '../../classes/project.class';

@Injectable({
    providedIn: 'root'
})
export class ProjectApiService extends DataApiService<Project> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/project', http, Project);
    }

    // api/authenticates

    getProjects(user_id: number): Observable<Project[]> {
        const params = {
            user_id
        };
        return this.getAll(params);
    }

    getProject(id: string): Observable<Project> {
        return this.getOne(id);
    }

    patchProject(id: string, project: Partial<Project>): Observable<Project> {
        return this.update(id, {}, '', project);
    }

    postProject(project: Project): Observable<Project> {
        project.user_id=Number(sessionStorage.getItem('userid'));
        return this.create(project);
    }

    deleteProject(id: string): Observable<void> {
        const params = {
            user_id: 4
        }
        return this.deleteOne(id, '', params) as Observable<void>;
    }

    deleteProjects(ids: number[]): Observable<void> {
        const params = {
            ids: ids,
            user_id: 4
        }
        return this.deleteAll('',params) as Observable<void>;
    }
}
