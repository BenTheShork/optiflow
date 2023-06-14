import { ActivityLog } from "./activity-log.class";

export class ActivityLogPagination {
    public current_page: number = null;
    public data: ActivityLog[] = null;
    public first_page_url: string = null;
    public fom: number = null;
    public to: number = null;
    public last_page: number = null;
    public last_page_url: string = null;
    public next_page_url: string = null;
    public path: string = null;
    public per_page: number = null;
    public total: number = null;

    constructor(activityLogPaginationShape?: Partial<ActivityLogPagination>) {

        if (activityLogPaginationShape != null) {
            if (activityLogPaginationShape.current_page != null) {
                this.current_page = activityLogPaginationShape.current_page;
            }
            if (activityLogPaginationShape.data != null) {
                this.data = activityLogPaginationShape.data;
            }
            if (activityLogPaginationShape.first_page_url != null) {
                this.first_page_url = activityLogPaginationShape.first_page_url;
            }
            if (activityLogPaginationShape.fom != null) {
                this.fom = activityLogPaginationShape.fom;
            }
            if (activityLogPaginationShape.to != null) {
                this.to = activityLogPaginationShape.to;
            }
            if (activityLogPaginationShape.last_page != null) {
                this.last_page = activityLogPaginationShape.last_page;
            }
            if (activityLogPaginationShape.last_page_url != null) {
                this.last_page_url = activityLogPaginationShape.last_page_url;
            }
            if (activityLogPaginationShape.next_page_url != null) {
                this.next_page_url = activityLogPaginationShape.next_page_url;
            }
            if (activityLogPaginationShape.path != null) {
                this.path = activityLogPaginationShape.path;
            }
            if (activityLogPaginationShape.per_page != null) {
                this.per_page = activityLogPaginationShape.per_page;
            }
            if (activityLogPaginationShape.total != null) {
                this.total = activityLogPaginationShape.total;
            }
        }
    }
}
