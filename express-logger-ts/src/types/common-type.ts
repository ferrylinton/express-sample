export type PingType = {
    message: string
}

export type FindResult<T> = {
    list: Array<T>,
    total: number
}

export type Pagination = {
    total: number,
    totalPage: number,
    page: number,
    pageSize: number,
}

export type Pageable<T> = {
    data: Array<T>,
    pagination: Pagination,
    keyword?: string,
    column?: string,
    sort?: string
}

export type RequestParams = {
    column?: string,
    keyword?: string,
    page?: number,
    sort?: string
}