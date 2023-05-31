
export class Version {
    public id: string = null;
    public version: string = null;
    public name: string = null;
    public process_id: number = null;
    public description: string = null;
    public num_people: number = null;
    public totla_duration: number = null;
    public grade: number = null;
    public created_at: string = null;
    public updated_at: string = null;

    constructor(versionShape?: Partial<Version>) {

        if (versionShape != null) {
            if (versionShape.id != null) {
                this.id = versionShape.id;
            }
            if (versionShape.name != null) {
                this.name = versionShape.name;
            }
            if (versionShape.process_id != null) {
                this.process_id = versionShape.process_id;
            }
            if (versionShape.description != null) {
                this.description = versionShape.description;
            }
            if (versionShape.description != null) {
                this.description = versionShape.description;
            }
            if (versionShape.num_people != null) {
                this.num_people = versionShape.num_people;
            }
            if (versionShape.totla_duration != null) {
                this.totla_duration = versionShape.totla_duration;
            }
            if (versionShape.grade != null) {
                this.grade = versionShape.grade;
            }
            if (versionShape.description != null) {
                this.description = versionShape.description;
            }
            if (versionShape.created_at != null) {
                this.created_at = versionShape.created_at;
            }
            if (versionShape.updated_at != null) {
                this.updated_at = versionShape.updated_at;
            }
        }
    }
}
