import { VersionStatus } from "./version-status.enum";

export class Version {
    public id: string = null;
    public major: number = null;
    public minor: number = null;
    public patch: number = null;
    public process_id: number = null;
    public description: string = null;
    public total_num_people: number = null;
    public total_duration: number = null;
    public grade: number = null;
    public created_at: string = null;
    public updated_at: string = null;
    public user_id: number = null;
    public status: VersionStatus = null;
    public file: any = null;

    constructor(versionShape?: Partial<Version>) {

        if (versionShape != null) {
            if (versionShape.id != null) {
                this.id = versionShape.id;
            }
            if (versionShape.major != null) {
                this.major = versionShape.major;
            }
            if (versionShape.minor != null) {
                this.minor = versionShape.minor;
            }
            if (versionShape.patch != null) {
                this.patch = versionShape.patch;
            }
            if (versionShape.process_id != null) {
                this.process_id = versionShape.process_id;
            }
            if (versionShape.description != null) {
                this.description = versionShape.description;
            }
            if (versionShape.total_num_people != null) {
                this.total_num_people = versionShape.total_num_people;
            }
            if (versionShape.total_duration != null) {
                this.total_duration = versionShape.total_duration;
            }
            if (versionShape.grade != null) {
                this.grade = versionShape.grade;
            }
            if (versionShape.created_at != null) {
                this.created_at = versionShape.created_at;
            }
            if (versionShape.updated_at != null) {
                this.updated_at = versionShape.updated_at;
            }
            if (versionShape.user_id != null) {
                this.user_id = versionShape.user_id;
            }
            if (versionShape.status != null) {
                this.status = versionShape.status;
            }
            if (versionShape.file != null) {
                this.file = versionShape.file;
            }
        }
    }
}
