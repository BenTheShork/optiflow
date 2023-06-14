import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@src/app/share/classes/activity.class';
import { Process } from '@src/app/share/classes/process.class';
import { Project } from '@src/app/share/classes/project.class';
import { VersionStatus } from '@src/app/share/classes/version-status.enum';
import { Version } from '@src/app/share/classes/version.class';
import { ActivityApiService } from '@src/app/share/services/api/activity-api.service';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
import { ProjectApiService } from '@src/app/share/services/api/project-api.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import { LoadingScreenService } from '@src/app/share/services/loading-screen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-version-detail',
  templateUrl: './version-detail.component.html',
  styleUrls: ['./version-detail.component.scss']
})
export class VersionDetailComponent implements OnInit {
  public version$ = new Observable<Version>();
  public process$ = new Observable<Process[]>();
  public activities$ = new Observable<Activity[]>();
  public project$ = new Observable<Project>();
  public canEdit = true;
  public projectId: string;
  public versionId: string;
  public processId: string;
  public processName: string;
  status: typeof VersionStatus = VersionStatus;

  constructor(
    private versionApiService: VersionApiService,
    private processApiService: ProcessApiService,
    private activityApiService: ActivityApiService,
    private projectApiService: ProjectApiService,
    private route: ActivatedRoute,
    private readonly loadingService: LoadingScreenService,
  ) {
    this.projectId = route.snapshot.paramMap.get('id');
    this.processId = route.snapshot.paramMap.get('processId');
    this.versionId = route.snapshot.paramMap.get('versionId');
  }

  ngOnInit() {
    if (this.versionId) {
        this.refreshData();
    }
    if (this.processId) {
      this.process$ = this.processApiService.getProcesses(this.projectId, Number(sessionStorage.getItem('userid')), sessionStorage.getItem('token'));
      this.process$.subscribe(processes => {
        const process = processes.find(process => process.id == this.processId);
        this.processName = process ? process.name : '';
      });
    }
  }

  onCanEditChange(canEdit: boolean) {
    this.canEdit = canEdit;
  }

  refreshVersion() {
    this.version$ = this.versionApiService.getVersion(this.versionId);
  }

  refreshActivities() {
    this.activities$ = this.activityApiService.getActivities(this.versionId);
  }

  getProject() {
    this.project$ = this.projectApiService.getProject(this.projectId);
  }

  private refreshData() {
    this.refreshVersion();
    this.refreshActivities();
    this.getProject();
  }
}
