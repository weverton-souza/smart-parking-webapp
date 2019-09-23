import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IModel, IService, IResponse, IPageableResponse } from '../interfaces';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@/core/service/authentication.service';

export abstract class AbstractModel implements IModel {
    id?: string;
}

export abstract class AbstractService<T extends AbstractModel> implements IService<T> {
    protected url: string = environment.urlAPI;
    protected http: HttpClient;

    constructor(injector: Injector, typeModel: string) {
        this.http = injector.get(HttpClient);
        this.url += typeModel;
    }

    save(resource: T): Observable<IResponse<T>> {
        return this.http.post<IResponse<T>>(this.url, resource);
    }

    update(resource: T): Observable<IResponse<T>> {
        return this.http.put<IResponse<T>>(this.url, resource);
    }

    findById(resourceId: string): Observable<IResponse<T>> {
        return this.http.get<IResponse<T>>(this.url + `/${resourceId}`);
    }

    findAll(): Observable<IPageableResponse<T>> {
        return this.http.get<IPageableResponse<T>>(this.url);
    }

    delete(resource: T): Observable<any> {
        return this.http.delete<T>(this.url + `/${resource.id}`);
    }
}