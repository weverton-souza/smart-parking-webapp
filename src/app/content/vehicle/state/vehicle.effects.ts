import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { IResponse, IPageableResponse } from '@/shared/interfaces';
import { Save, SaveSuccess, SaveFail, FindAllSuccess, FindAllFail, FindById, FindByIdSuccess, FindByIdFail, FindAll, Delete, DeleteSuccess, DeleteFail } from './vehicle.actions';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

@Injectable()
export class VehicleEffect {
    constructor(private actions$: Actions, private service: VehicleService) { }

    //#region | Save address effect.
    @Effect()
    save$: Observable<Action> = this.actions$.pipe(
        ofType<Save>(Save.actionType),
        map((action: Save) => action.payload),
        switchMap((resource: Vehicle) =>
            this.service.save(resource).pipe(
                map((res: IResponse<Vehicle>) =>
                    new SaveSuccess(res)),
                catchError(err => of(new SaveFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Vehicle>) =>{
                return new FindAllSuccess(resp)
            }),
            catchError(err => of(new FindAllFail(err)))
        ))
    );
    //#endregion

    //#region | Load address effect.
    @Effect()
    findById$: Observable<Action> = this.actions$.pipe(
        ofType<FindById>(FindById.actionType),
        mergeMap((findById: FindById) =>
            this.service.findById(findById.VehicleId).pipe(
                map((res: IResponse<Vehicle>) =>
                new FindByIdSuccess(res)),
                catchError(err => of(new FindByIdFail(err)))
            )
        )
    );
    //#endregion

    //#region | Load addresses effect.
    @Effect()
    findAll$: Observable<Action> = this.actions$.pipe(
        ofType<FindAll>(FindAll.actionType),
        mergeMap(() => 
        this.service.findAll().pipe(
                map((res: IPageableResponse<Vehicle>) =>{
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
        switchMap((customer: Vehicle) =>
            this.service.delete(customer).pipe(
                map((res: IResponse<Vehicle>) =>
                new DeleteSuccess(res)),
                catchError(err => of(new DeleteFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Vehicle>) =>
                new FindAllSuccess(resp)
            ),
            catchError(err => of(new FindAllFail(err)))
        ))
    );
    //#endregion
}
