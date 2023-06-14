
export class Activity {
    public id: string = null;
    public process_version_id: number = null;
    public name: string = null;
    public description: string = null;
    public duration: number = null;
    public num_people: number = null;
    public sequence_number: number = null;
    public created_at: string = null;
    public updated_at: string = null;
    public user_id: number = null;

    constructor(activityShape?: Partial<Activity>) {

        if (activityShape != null) {
            if (activityShape.id != null) {
                this.id = activityShape.id;
            }
            if (activityShape.process_version_id != null) {
                this.process_version_id = activityShape.process_version_id;
            }
            if (activityShape.name != null) {
                this.name = activityShape.name;
            }
            if (activityShape.description != null) {
                this.description = activityShape.description;
            }
            if (activityShape.duration != null) {
                this.duration = activityShape.duration;
            }
            if (activityShape.num_people != null) {
                this.num_people = activityShape.num_people;
            }
            if (activityShape.sequence_number != null) {
                this.sequence_number = activityShape.sequence_number;
            }
            if (activityShape.created_at != null) {
                this.created_at = activityShape.created_at;
            }
            if (activityShape.updated_at != null) {
                this.updated_at = activityShape.updated_at;
            }
            if (activityShape.user_id != null) {
                this.user_id = activityShape.user_id;
            }
        }
    }
}
