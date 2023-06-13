
export class ActivityLog {
    public id: string = null;
    public table_name: string = null;
    public record: string = null;
    public action: string = null;
    public created_at: string = null;

    constructor(activityLogShape?: Partial<ActivityLog>) {

        if (activityLogShape != null) {
            if (activityLogShape.id != null) {
                this.id = activityLogShape.id;
            }
            if (activityLogShape.table_name != null) {
                this.table_name = activityLogShape.table_name;
            }
            if (activityLogShape.action != null) {
                this.action = activityLogShape.action;
            }
            if (activityLogShape.created_at != null) {
                this.created_at = activityLogShape.created_at;
            }
        }
    }
}
