import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Project } from '@src/app/classes/project.class';
import { DataApiService } from './templates/data-api.service';

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

    patchProject(id: string, chapter: Partial<Project>): Observable<Project> {
        return this.update(id, chapter);
    }

    postProject(chapter: Project): Observable<Project> {
        return this.create(chapter);
    }

    deleteProject(id: string): Observable<void> {
        return this.deleteOne(id) as Observable<void>;
    }
}
