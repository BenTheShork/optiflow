import { Project } from "./project.class";
import { VersionInsightsHelper } from "./version-insights-helper.class";

export class Insights {
    public id: string = null;
    public total_num_projects: number = null;
    public total_num_processes: number = null;
    public total_num_activities: number = null;
    public avg_processes_per_project: string = null;
    public avg_activities_per_process: string = null;
    public avg_grade_per_process: string = null;
    public avg_duration_per_process: string = null;
    public avg_num_people_per_process: string = null;
    public version_max_duration: VersionInsightsHelper = null;
    public version_min_duration: VersionInsightsHelper = null;
    public version_max_num_people: VersionInsightsHelper = null;
    public version_min_num_people: VersionInsightsHelper = null;
    public projects: Project[] = null;

    constructor(insightsShape?: Partial<Insights>) {

        if (insightsShape != null) {
            if (insightsShape.id != null) {
                this.id = insightsShape.id;
            }
            if (insightsShape.total_num_projects != null) {
                this.total_num_projects = insightsShape.total_num_projects;
            }
            if (insightsShape.total_num_processes != null) {
                this.total_num_processes = insightsShape.total_num_processes;
            }
            if (insightsShape.total_num_activities != null) {
                this.total_num_activities = insightsShape.total_num_activities;
            }
            if (insightsShape.avg_processes_per_project != null) {
                this.avg_processes_per_project = insightsShape.avg_processes_per_project;
            }
            if (insightsShape.avg_activities_per_process != null) {
                this.avg_activities_per_process = insightsShape.avg_activities_per_process;
            }
            if (insightsShape.avg_grade_per_process != null) {
                this.avg_grade_per_process = insightsShape.avg_grade_per_process;
            }
            if (insightsShape.avg_duration_per_process != null) {
                this.avg_duration_per_process = insightsShape.avg_duration_per_process;
            }
            if (insightsShape.avg_num_people_per_process != null) {
                this.avg_num_people_per_process = insightsShape.avg_num_people_per_process;
            }
            if (insightsShape.version_max_duration != null) {
                this.version_max_duration = insightsShape.version_max_duration;
            }
            if (insightsShape.version_min_duration != null) {
                this.version_min_duration = insightsShape.version_min_duration;
            }
            if (insightsShape.version_max_num_people != null) {
                this.version_max_num_people = insightsShape.version_max_num_people;
            }
            if (insightsShape.version_min_num_people != null) {
                this.version_min_num_people = insightsShape.version_min_num_people;
            }
            if (insightsShape.projects != null) {
                this.projects = insightsShape.projects;
            }
        }
    }
}
