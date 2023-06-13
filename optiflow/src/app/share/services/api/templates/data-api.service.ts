import { HttpClient } from '@angular/common/http';
import { Options } from '@src/app/share/classes/helper/options.class';
import { UpdateRequest } from '@src/app/share/classes/helper/update-request.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class DataApiService<T, G = T> {

    constructor(protected url: string, protected http: HttpClient, private type: new (Object: any) => T) { }

    /**
     * This method calls the backend to return all resources.
     *
     * @param params
     * @param urlExtension
     */
    protected getAll(params?: any, urlExtension: string = ''): Observable<Array<T>> {
        const options = new Options(params);
        return this.http.get<T[]>(this.url + urlExtension, options)
            .pipe(map(res => {
                const array: T[] = [];

                for (const resourceObject of res) {
                    array.push(new this.type(resourceObject));
                }

                return res;
            }));
    }

    /**
     * This method calls the backend to return all resources.
     *
     * @param params
     * @param urlExtension
     */
    protected getAllIns(params?: any, urlExtension: string = ''): Observable<T> {
        const options = new Options(params);
        return this.http.get<T[]>(this.url + urlExtension, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to receive a resource with the given id.
     *
     * @param resourceId
     * @param controller
     * @param params
     */
    protected getOne(resourceId?: string, controller: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        const resource = (resourceId !== undefined) ? '/' + resourceId : '';
        return this.http.get<T>(this.url + controller + resource, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to receive a paginated resource.
     *
     * @param resourceId
     * @param controller
     * @param params
     */
    protected getOnePaginated(resourceId?: string, controller: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        const resource = (resourceId !== undefined) ? ('/' + resourceId) : '';
        return this.http.get<T>(this.url + controller + resource, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to create the resource.
     *
     * @param resource
     * @param urlExtension
     * @param params
     */
    protected create(resource: G, urlExtension: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        return this.http.post<G>(this.url + urlExtension, resource, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to create the resource.
     *
     * @param resource
     * @param urlExtension
     * @param params
     */
    protected createUser(resource: G, urlExtension: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        return this.http.post<G>(this.url + urlExtension, resource, options)
            .pipe(
                map((res: G) => new this.type(res) as T)
            );
    }

    /**
     * This method calls the backend to create the resource and does not expect any return.
     *
     * @param resource
     * @param urlExtension
     * @param params
     */
    protected createEmpty(resource: G, urlExtension: string = '', params?: any): Observable<void> {
        const options = new Options(params);
        return this.http.post<void>(this.url + urlExtension, resource, options);
    }

    /**
     * This method updates all resources that are provided.
     *
     * @param resources
     * @param urlExtension
     * @param params
     */
     protected updateMany(resources: G[], urlExtension: string = '', params?: any): Observable<void> {
        const options = new Options(params);
        return this.http.post<null>(this.url + urlExtension, resources, options);
    }

    /**
     * This method calls the backend to put a resource with the given id.
     *
     * @param resourceId
     * @param resource
     * @param controller
     */
    protected put(resourceId: string, resource: G, controller: string = ''): Observable<T> {
        return this.http.put<G>(this.url + controller + '/' + resourceId, resource)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to update|patch a resource with the given id.
     *
     * @param resourceId
     * @param resource
     * @param action
     * @param params
     */
    protected update(resourceId: string, resource: Partial<G>, action: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        const data = new UpdateRequest<Partial<G>>(resource, Object.keys(resource));
        return this.http.patch<G>(this.url + action + '/' + resourceId, data, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to update|patch a resource with the given id.
     *
     * @param resourceId
     * @param resource
     * @param action
     * @param params
     */
    protected updateVers(resourceId: string, resource: Partial<G>, action: string = '', params?: any): Observable<T> {
        const options = new Options(params);
        const data = new UpdateRequest<Partial<G>>(resource, Object.keys(resource));
        return this.http.patch<G>(this.url + action + '/' + resourceId, data.data, options)
            .pipe(map((res) => new this.type(res)));
    }

    /**
     * This method calls the backend to update|patch a resource with the given id.
     *
     * @param resourceId
     * @param resource
     * @param action
     * @param params
     */
    protected updateEmpty(resourceId: string, resource: Partial<G>, action: string = '', params?: any): Observable<void> {
        const options = new Options(params);
        const data = new UpdateRequest<Partial<G>>(resource, Object.keys(resource));
        return this.http.patch<void>(this.url + action + '/' + resourceId, data, options);
    }

    /**
     * This method calls the backend to delete a resource with the given id.
     *
     * @param urlExtension
     * @param params
     */
    protected delete(urlExtension: string = '', params?: any): Observable<void> {
        const options = new Options(params);
        return this.http.delete<null>(this.url + urlExtension, options);
    }

    /**
     * This method calls the backend to delete a resource with the given id.
     *
     * @param resourceId
     * @param urlExtension
     * @param params
     */
    protected deleteOne(resourceId: string, urlExtension: string = '', params?: any): Observable<void | T> {
        const options = { body: params };
        return this.http.delete<null | T>(this.url + urlExtension + '/'  + resourceId, options);
    }

    /**
     * This method calls the backend to delete all resources.
     *
     * @param urlExtension
     * @param params
     */
    protected deleteAll(urlExtension: string = '', params?: any): Observable<void> {
        const options = { body: params }
        return this.http.delete<null>(this.url + urlExtension, options);
    }
}
