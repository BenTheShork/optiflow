import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataApiService } from './templates/data-api.service';
import { User } from '../../classes/user.class';
import { UserCredentials } from '../../classes/userCredentials.class';
@Injectable({
    providedIn: 'root'
})
export class UserApiService extends DataApiService<User> {

    constructor(protected http: HttpClient) {
        super(environment.api + '/user', http, User);
    }

    // api/authenticates

    getUsers(username: string): Observable<any[]> {
        const params = {
            username
        };
        return this.getAll(params);
    }

    getUser(username: string): Observable<User> {
        return this.getOne(username);
    }

    patchUser(id: string, process: Partial<User>): Observable<User> {
        return this.update(id, {}, '', process);
    }

    postUser(user: User): Observable<User> {
        return this.create(user);
    }

    deleteUser(id: string): Observable<void> {
        return this.deleteOne(id) as Observable<void>;
    }

    deleteUsers(ids: number[]): Observable<void> {
        return this.deleteAll('', ids) as Observable<void>;
    }
}
