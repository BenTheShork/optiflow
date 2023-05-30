import { HttpClient } from '@angular/common/http';
import { Options } from '@src/app/share/classes/helper/options.class';
import { Pagination } from '@src/app/share/classes/helper/pagination.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class PaginationDataApiService<T> {

    constructor(protected url: string, protected http: HttpClient, private type: new (Object: any) => T) { }

    /**
     * This method calls the backend to return all resources.
     *
     * @param params
     * @param urlExtension
     * @returns
     */
    protected getPage(
        pageNumber: number,
        pageSize: number = 12,
        params: any = {},
        urlExtension: string = ''
    ): Observable<Pagination<T>> {
        params.pageNumber = pageNumber;
        params.pageSize = pageSize;
        const options = new Options(params);
        return this.http.get<Pagination<T>>(this.url + urlExtension, options)
            .pipe(map(res => {
                const resourceObject = new Pagination<T>(res);
                resourceObject.items = resourceObject.items.map(i => new this.type(i));
                return resourceObject;
            }));
    }
}
