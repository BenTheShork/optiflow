import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

    loadingStatus: Subject<boolean> = new Subject<boolean>();
    private isLoading: boolean;

    get loading(): boolean {
        return this.isLoading;
    }

    set loading(value) {
        this.isLoading = value;
        this.loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
