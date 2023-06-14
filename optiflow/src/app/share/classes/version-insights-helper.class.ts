
export class VersionInsightsHelper {
    public id: string = null;
    public project_id: number = null;
    public process_id: number = null;
    public version_id: number = null;
    public duration: number = null;
    public num_people: number = null;
    public project_name: string = null;
    public process_name: string = null;
    public version_number: string = null;

    constructor(versionInsightsHelperShape?: Partial<VersionInsightsHelper>) {

        if (versionInsightsHelperShape != null) {
            if (versionInsightsHelperShape.id != null) {
                this.id = versionInsightsHelperShape.id;
            }
            if (versionInsightsHelperShape.project_id != null) {
                this.project_id = versionInsightsHelperShape.project_id;
            }
            if (versionInsightsHelperShape.process_id != null) {
                this.process_id = versionInsightsHelperShape.process_id;
            }
            if (versionInsightsHelperShape.version_id != null) {
                this.version_id = versionInsightsHelperShape.version_id;
            }
            if (versionInsightsHelperShape.duration != null) {
                this.duration = versionInsightsHelperShape.duration;
            }
            if (versionInsightsHelperShape.num_people != null) {
                this.num_people = versionInsightsHelperShape.num_people;
            }
            if (versionInsightsHelperShape.project_name != null) {
                this.project_name = versionInsightsHelperShape.project_name;
            }
            if (versionInsightsHelperShape.process_name != null) {
                this.process_name = versionInsightsHelperShape.process_name;
            }
            if (versionInsightsHelperShape.version_number != null) {
                this.version_number = versionInsightsHelperShape.version_number;
            }
        }
    }
}
