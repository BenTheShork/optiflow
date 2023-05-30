import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { Project } from '../classes/project.class';
import { Process } from '../classes/process.class';

@Injectable({
    providedIn: 'root'
})
export class LegalizationDatagridService {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    public redirectTo(allowRedirectToDetails: boolean, url: string, idField: string, idValue: string): void {
        if (!allowRedirectToDetails) {
            return;
        }
        this.router.navigate([url], {
            relativeTo: this.route,
            queryParams: { [idField]: idValue }
        });
    }

    public redirectToDetails(allowRedirectToDetails: boolean, url: string, idField: string, e?: any): void {
        if (!allowRedirectToDetails) {
            return;
        }
        if (!e || e.rowType !== 'data') {
            this.router.navigate([url], {
                relativeTo: this.route
            });
        } else {
            this.router.navigate([url], {
                relativeTo: this.route,
                queryParams: { [idField]: e.data.id },
                queryParamsHandling: 'merge'
            });
        }
    }

    public onCellPrepared(e: {
        rowType: string;
        column: dxDataGridColumn;
        data: Project | Process;
        cellElement: { classList: { add: (arg0: string) => void } };
    }): void {
        if (e.rowType !== 'data' || !e.column.name) {
            return;
        }
    }
}
