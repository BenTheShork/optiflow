import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@src/app/classes/project.class';
import { ProjectApiService } from '@src/app/services/api/project-api.service';
import { LegalizationDatagridService } from '@src/app/services/legalization-data-grid.service';
import { LoadingScreenService } from '@src/app/services/loading-screen.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { dxDataGridColumn } from 'devextreme/ui/data_grid';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss']
})
export class ProjectsOverviewComponent {

  @ViewChild(DxDataGridComponent) grid$: DxDataGridComponent;

  public project$ = new Observable<Project[]>();
  public canEdit = false;

  private urlDetail = '/project';

  constructor(
    private legalizationDatagridService: LegalizationDatagridService,
    private route: ActivatedRoute,
    private projectApiService: ProjectApiService,
    private readonly loadingService: LoadingScreenService,
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  onCanEditChange(canEdit: boolean) {
    this.canEdit = canEdit;
  }

  redirectToDetails(event: any): void {
    this.legalizationDatagridService.redirectToDetails(
        true,
        this.urlDetail,
        'projectId',
        event
    );
  }

  onCellPrepared(e: {
      rowType: string;
      column: dxDataGridColumn;
      data: Project;
      cellElement: { classList: { add: (arg0: string) => void } };
  }) {
      this.legalizationDatagridService.onCellPrepared(e);
  }

  private refreshData() {
    this.loadingService.startLoading();
    this.project$ = this.projectApiService.getProjects(4)
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
