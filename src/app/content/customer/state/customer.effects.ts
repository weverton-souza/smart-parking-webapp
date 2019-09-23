import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { IResponse, IPageableResponse } from '@/shared/interfaces';
import { CustomerService } from '../services/customer.service';
import { Save, SaveSuccess, SaveFail, FindAllSuccess, FindAllFail, FindById, FindByIdSuccess, FindByIdFail, FindAll, Delete, DeleteSuccess, DeleteFail } from './customer.actions';

@Injectable()
export class CustomerEffect {
    constructor(private actions$: Actions, private service: CustomerService) { }

    //#region | Save address effect.
    @Effect()
    save$: Observable<Action> = this.actions$.pipe(
        ofType<Save>(Save.actionType),
        map((action: Save) => action.payload),
        switchMap((resource: Customer) =>
            this.service.save(resource).pipe(
                map((res: IResponse<Customer>) =>
                    new SaveSuccess(res)),
                catchError(err => of(new SaveFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Customer>) =>{
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
            this.service.findById(findById.CustomerId).pipe(
                map((res: IResponse<Customer>) =>
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
                map((res: IPageableResponse<Customer>) =>{
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
        switchMap((customer: Customer) =>
            this.service.delete(customer).pipe(
                map((res: IResponse<Customer>) =>
                new DeleteSuccess(res)),
                catchError(err => of(new DeleteFail(err)))
            )
        ),
        switchMap(() =>
            this.service.findAll().pipe(
                map((resp: IPageableResponse<Customer>) =>
                new FindAllSuccess(resp)
            ),
            catchError(err => of(new FindAllFail(err)))
        ))
    );
    //#endregion
}
