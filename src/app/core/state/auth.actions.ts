import { Action } from '@ngrx/store';
import { UserAccess } from '../model/user-access.model';
import { IResponse, IPageableResponse } from '@/shared/interfaces';
import { fromUtils } from '@/utils';

//#region | Login declarations.

export interface AuthState extends IResponse<UserAccess> {
}

export interface UserAccessPageState extends
    IPageableResponse<UserAccess> {
    selectedUserAccessId: string | null | undefined;
}

export const initialState: AuthState = {
    content: {} as UserAccess,
    loading: false,
    loaded: false,
    error: '',
};

//#region | Login operations.
export class Login implements Action {
    static actionType: string = fromUtils.type('[AUTH] LOGIN');
    readonly type = Login.actionType;

    constructor(public email: string, public password: string) {}
}

export class LoginSuccess implements Action {
    static actionType: string = fromUtils.type('[AUTH] LOGIN_SUCCESS');
    readonly type = LoginSuccess.actionType;

    constructor(public payload: IResponse<UserAccess>) {}

    static reduce(state: AuthState, action: LoginSuccess): AuthState {
        return {
            ...state,
            ...action.payload,
            loading: false,
            loaded: true
        };
    }
}

export class LoginFail implements Action {
    static actionType: string = fromUtils.type('[AUTH] LOGIN_FAIL');
    readonly type = LoginFail.actionType;

    constructor(public payload: string) {}

    static reduce(state: AuthState, action: LoginFail): AuthState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload
        };
    }
}
//#endregion

//#endregion

//#region | Reducer builder.
export const AuthReducer = fromUtils.buildReducer(initialState, LoginSuccess, LoginFail);
//#endregion
