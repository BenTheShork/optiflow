import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BarDataShape, ChartDataShape } from '@src/app/share/classes/chart-data.interface';
import { Insights } from '@src/app/share/classes/insights.class';
import { Process } from '@src/app/share/classes/process.class';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { InsightsApiService } from '@src/app/share/services/api/insights-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insights-overview',
  templateUrl: './insights-overview.component.html',
  styleUrls: ['./insights-overview.component.scss']
})

export class InsightsOverviewComponent extends UnsubscribeDirective implements OnInit{

  public insights$ = new Observable<Insights>();
  public chartData: any= [];
  public barData: BarDataShape[] = [];

  constructor(
    private insightsApiService: InsightsApiService,
    private translate: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.insights$ = this.insightsApiService.getInsights(Number(sessionStorage.getItem('userid')), sessionStorage.getItem('token'));
    this.insights$.subscribe((insight) => {
      if (insight.projects !== null) {
        for (let project of insight.projects) {
          if (project.process.length !== 0) {
            let calulation = this.calculateArea(project.process);
            this.chartData.push({
              project_name: project.name,
              data: calulation
            });
            let barDate = {
              name: project.name,
              process_num: project.num_processes,
              version_num: project.process.reduce( (accumulator: number, process: Process) => accumulator + process.num_versions, 0)
            }
            this.barData.push(barDate);
          }
        }
      }
    });
  }

  calculateArea(processes: Process[]): ChartDataShape[] {
    const totalCount = processes.length;
    const statusCount = {
      "0": 0,
      "1": 0
    };
  
    for (const process of processes) {
      statusCount[process.status]++;
    }
  
    const statusList: ChartDataShape[] = [];
  
    for (const key in statusCount) {
      if (statusCount.hasOwnProperty(key)) {
        const status: ChartDataShape = {
          name: key === "0" ? this.translate.instant('completed') : this.translate.instant('active'),
          area: Math.floor((statusCount[key as keyof typeof statusCount] / totalCount) * 100)
        };
        statusList.push(status);
      }
    }
  
    return statusList;
  }

  pointClickHandler(event: any) {
    this.toggleVisibility(event.target);
  }
  
  onPointClick(event: any) {
    event.target.select();
  }

  legendClickHandler(event: any) {
    const arg = event.target;
    const item = event.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item: any) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }
}
