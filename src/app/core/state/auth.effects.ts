import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserAccess } from '../model/user-access.model';
import { Login, LoginSuccess, LoginFail } from './auth.actions';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { IResponse } from '@/shared/interfaces';

@Injectable()
export class UserAccessEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router) { }

    //#region | Login effect.
    @Effect()
    findByEmail$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(Login.actionType),
        mergeMap((resource: Login) =>
            this.authService.login(resource.email, resource.password).pipe(
                map((res: IResponse<UserAccess>) => {
                    localStorage.setItem('user', JSON.stringify(res.content));
                    this.authService.setCurrentUserValue(res.content);
                    this.router.navigate(['']);
                    return new LoginSuccess(res);
            }), catchError(err => of(new LoginFail(err))))
        )
    );
    //#endregion

}
