import { Observable } from 'rxjs';


export interface IModel {
    id?: string;
}

export interface IService<T> {
    save(resource: T): Observable<IResponse<T>>;
    update(resource: T): Observable<IResponse<T>>;
    findById(resourceId: string): Observable<IResponse<T>>;
    findAll(): Observable<IPageableResponse<T>>;
    delete(resource: T): void;
}

export interface IResponseConfig {
    content: any;
    loading: boolean;
    loaded: boolean;
    error: string;
    status?: number;
    description?: string;
}

export interface IResponse<T> extends IResponseConfig {
    content: T;
}

export interface IPageableResponse<T> extends IResponseConfig {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        pageSize: number,
        pageNumber: number,
        offset: number,
        unpaged: boolean,
        paged: boolean
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    };
    numberOfElements: number;
    empty: boolean;
}

