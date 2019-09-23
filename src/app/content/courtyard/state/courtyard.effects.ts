import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Courtyard } from '../models/courtyard.model';
import { IResponse, IPageableResponse } from '@/shared/interfaces';
import { CourtyardService } from '../services/courtyard.service';
import { Save, SaveSuccess, SaveFail, FindAllSuccess, FindAllFail, FindById, FindByIdSuccess, FindByIdFail, FindAll, Delete, DeleteSuccess, DeleteFail } from './courtyard.actions';

@Injectable()
export class CourtyardEffect {
    constructor(private actions$: Actions, private service: CourtyardService) { }

    //#region | Save effect.
    @Effect()
    save$: Observable<Action> = this.actions$.pipe(
        ofType<Save>(Save.actionType),
        map((action: Save) => action.payload),
        switchMap((resource: Courtyard) =>
            this.service.save(resource).pipe(
                map((res: IResponse<Courtyard>) =>
                    new SaveSuccess(res)),
                catchError(err => of(new SaveFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Courtyard>) =>{
                return new FindAllSuccess(resp)
            }),
            catchError(err => of(new FindAllFail(err)))
        ))
    );
    //#endregion

    //#region | Load effect.
    @Effect()
    findById$: Observable<Action> = this.actions$.pipe(
        ofType<FindById>(FindById.actionType),
        mergeMap((findById: FindById) =>
            this.service.findById(findById.CourtyardId).pipe(
                map((res: IResponse<Courtyard>) =>
                new FindByIdSuccess(res)),
                catchError(err => of(new FindByIdFail(err)))
            )
        )
    );
    //#endregion

    //#region | Load effect.
    @Effect()
    findAll$: Observable<Action> = this.actions$.pipe(
        ofType<FindAll>(FindAll.actionType),
        mergeMap(() => 
        this.service.findAll().pipe(
                map((res: IPageableResponse<Courtyard>) =>{
                    return new FindAllSuccess(res)
                }),
                catchError(err => of(new FindAllFail(err)))
            )
        )
    );
    //#endregion

    //#region | Delete effect.
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<Delete>(Delete.actionType),
        map((action: Delete) => action.payload),
        switchMap((courtyard: Courtyard) =>
            this.service.delete(courtyard).pipe(
                map((res: IResponse<Courtyard>) =>
                new DeleteSuccess(res)),
                catchError(err => of(new DeleteFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Courtyard>) =>
                new FindAllSuccess(resp)
            ),
            catchError(err => of(new FindAllFail(err)))
        ))
    );
    //#endregion
}
