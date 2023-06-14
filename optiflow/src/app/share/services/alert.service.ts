import { Injectable } from "@angular/core";
import notify from 'devextreme/ui/notify';

export enum AlertType {
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Success = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

    notify(message: string, type: AlertType, duration: number = 2000) {
        notify(message, type, duration);
    }
}