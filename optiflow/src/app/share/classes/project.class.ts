import { Process } from "./process.class";

export class Project {
    public id: string = null;
    public name: string = null;
    public user_id: number = null;
    public description: string = null;
    public num_processes: number = null;
    public created_at: string = null;
    public updated_at: string = null;
    public process: Process[] = null;

    constructor(projectShape?: Partial<Project>) {

        if (projectShape != null) {
            if (projectShape.id != null) {
                this.id = projectShape.id;
            }
            if (projectShape.name != null) {
                this.name = projectShape.name;
            }
            if (projectShape.user_id != null) {
                this.user_id = projectShape.user_id;
            }
            if (projectShape.description != null) {
                this.description = projectShape.description;
            }
            if (projectShape.description != null) {
                this.description = projectShape.description;
            }
            if (projectShape.num_processes != null) {
                this.num_processes = projectShape.num_processes;
            }
            if (projectShape.description != null) {
                this.description = projectShape.description;
            }
            if (projectShape.created_at != null) {
                this.created_at = projectShape.created_at;
            }
            if (projectShape.updated_at != null) {
                this.updated_at = projectShape.updated_at;
            }
            if (projectShape.process != null) {
                this.process = projectShape.process;
            }
        }
    }
}
