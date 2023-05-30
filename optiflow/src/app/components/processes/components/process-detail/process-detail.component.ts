import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Process } from '@src/app/share/classes/process.class';
import { Project } from '@src/app/share/classes/project.class';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit{

  public process$ = new Observable<Process>();
  public projects$ = new Observable<Project[]>();
  //public versions$ = new Observable<Version[]>();
  public canEdit = true;
  public processId: string;
  public projectId: string;
  public projectName: string;

  constructor(
    private processApiService: ProcessApiService,
    private projectApiService: ProjectApiService,
    private route: ActivatedRoute,
    private readonly loadingService: LoadingScreenService,
  ) {
    this.projectId = route.snapshot.paramMap.get('id');
    this.processId = route.snapshot.paramMap.get('processId');
  }

  ngOnInit() {
    if (this.processId) {
        this.refreshData();
    }
    if (this.projectId) {
      this.projects$ = this.projectApiService.getProjects(4);
      this.projects$.subscribe(projects => {
        const project = projects.find(project => project.id == this.projectId);
        this.projectName = project ? project.name : '';
      });
    }
  }

  onCanEditChange(canEdit: boolean) {
    this.canEdit = canEdit;
  }

  refreshProcess() {
    this.process$ = this.processApiService.getProcess(this.processId);
  }

  /*refreshVersions() {
    this.versions$ = this.versionApiService.getVersions(this.processId);
  }*/

  private refreshData() {
    this.refreshProcess();
    //this.refreshVersions();
  }

}
