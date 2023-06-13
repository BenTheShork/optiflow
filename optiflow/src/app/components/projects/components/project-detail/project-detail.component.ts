import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Process } from '@src/app/share/classes/process.class';
import { Project } from '@src/app/share/classes/project.class';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit{
  public project$ = new Observable<Project>();
  public processes$ = new Observable<Process[]>();
  public canEdit = true;
  public projectId: string;

  constructor(
    private projectApiService: ProjectApiService,
    private processApiService: ProcessApiService,
    private route: ActivatedRoute,
    private readonly loadingService: LoadingScreenService,
  ) {
    this.projectId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.projectId) {
        this.refreshData();
    }
  }

  onCanEditChange(canEdit: boolean) {
    this.canEdit = canEdit;
  }

  refreshProcesses() {
    this.processes$ = this.processApiService.getProcesses(this.projectId, Number(sessionStorage.getItem('userid')));
  }

  refreshProject() {
    this.project$ = this.projectApiService.getProject(this.projectId);
  }

  private refreshData() {
    this.refreshProject();
    this.refreshProcesses();
  }
}
