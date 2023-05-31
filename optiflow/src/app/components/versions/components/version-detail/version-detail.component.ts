import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Process } from '@src/app/share/classes/process.class';
import { Version } from '@src/app/share/classes/version.class';
import { ProcessApiService } from '@src/app/share/services/api/process-api.service';
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
  //public activities$ = new Observable<Activity[]>();
  public canEdit = true;
  public projectId: string;
  public versionId: string;
  public processId: string;
  public processName: string;

  constructor(
    private versionApiService: VersionApiService,
    private processApiService: ProcessApiService,
    //private activityApiService: ActivityApiService,
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
      this.process$ = this.processApiService.getProcesses(this.projectId, 4);
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

  /*refreshProcesses() {
    this.process$ = this.processApiService.getProcesses(this.projectId, 4);
  }*/

  private refreshData() {
    this.refreshVersion();
    //this.refreshProcesses();
  }
}
