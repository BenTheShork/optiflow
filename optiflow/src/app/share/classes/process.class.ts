import { ProcessStatus } from "./process-status.enum";

export class Process {
    public id: string = null;
    public name: string = null;
    public project_id: number = null;
    public description: string = null;
    public num_versions: number = null;
    public best_version: number = null;
    public created_at: string = null;
    public updated_at: string = null;
    public status: ProcessStatus = null;
    public user_id: number = null;
    public token: string = null;

    constructor(processShape?: Partial<Process>) {

        if (processShape != null) {
            if (processShape.id != null) {
                this.id = processShape.id;
            }
            if (processShape.name != null) {
                this.name = processShape.name;
            }
            if (processShape.project_id != null) {
                this.project_id = processShape.project_id;
            }
            if (processShape.description != null) {
                this.description = processShape.description;
            }
            if (processShape.description != null) {
                this.description = processShape.description;
            }
            if (processShape.num_versions != null) {
                this.num_versions = processShape.num_versions;
            }
            if (processShape.best_version != null) {
                this.best_version = processShape.best_version;
            }
            if (processShape.description != null) {
                this.description = processShape.description;
            }
            if (processShape.created_at != null) {
                this.created_at = processShape.created_at;
            }
            if (processShape.updated_at != null) {
                this.updated_at = processShape.updated_at;
            }
            if (processShape.status != null) {
                this.status = processShape.status;
            }
            if (processShape.user_id != null) {
                this.user_id = processShape.user_id;
            }
            if (processShape.token != null) {
                this.token = processShape.token;
            }
        }
    }
}
