interface IPaginationShape<T> {
    total?: number;
    totalUnread?: number;
    pageNumber?: number;
    pageSize?: number;
    items?: T[];
}

export class Pagination<T> {
    public total: number = null;
    public totalUnread: number = null;
    public pageNumber: number = null;
    public pageSize: number = null;
    public items: T[] = [];

    constructor(paginationShape?: IPaginationShape<T>) {
        if (paginationShape != null) {
            if (paginationShape.total != null) {
                this.total = paginationShape.total;
            }
            if (paginationShape.totalUnread != null) {
                this.totalUnread = paginationShape.totalUnread;
            }
            if (paginationShape.pageNumber != null) {
                this.pageNumber = paginationShape.pageNumber;
            }
            if (paginationShape.pageSize != null) {
                this.pageSize = paginationShape.pageSize;
            }
            if (paginationShape.items != null) {
                this.items = paginationShape.items;
            }
        }
    }
}
