
export interface DataPageResponse<T> {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    data: T[];
}