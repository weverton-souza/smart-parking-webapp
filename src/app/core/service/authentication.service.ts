import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAccess } from '../model/user-access.model';
import { environment } from '@environments/environment';
import { IResponse } from '@/shared/interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url: string = environment.urlAPI;
    private store: Store<IAppState> 
    private currentUserSubject: BehaviorSubject<UserAccess>;
    public currentUser$: Observable<UserAccess>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserAccess>(JSON.parse(localStorage.getItem('user')));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAccess {
        return this.currentUserSubject.value;
    }

    public setCurrentUserValue(user: UserAccess) {
        this.currentUserSubject.next(user);
    }

    login(email: string, password: string): Observable<IResponse<UserAccess>> {
        return this.http
          .post<IResponse<UserAccess>>(`${this.url}/auth/login`, { email, password });
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }
}