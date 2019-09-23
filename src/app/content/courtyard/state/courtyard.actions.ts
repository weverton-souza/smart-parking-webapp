import { Action } from '@ngrx/store';
import { IPageableResponse, IResponse } from '@/shared/interfaces';
import { Courtyard } from '../models/courtyard.model';
import { fromUtils } from '@/utils';
import { IAppState } from '@/reducers/app.reducers';

//#region | State declarations.
export interface ResourcePageState extends IPageableResponse<Courtyard> {
    selectedCourtyardId: string | null;
}

export interface ResourceState extends IResponse<Courtyard> {
    content: Courtyard;
}

export interface ICourtyardState extends IAppState {
    courtyard: ResourceState;
    courtyards: ResourcePageState;
}

export const initialResourceState: ResourceState = {
    content: {} as Courtyard,
    loading: false,
    loaded: false,
    error: '',
};

export const initialPageState: ResourcePageState = {
    content: [],
    pageable: {
        sort: {
            sorted: false,
            unsorted: false,
            empty: false
        },
        pageSize: undefined,
        pageNumber: undefined,
        offset: undefined,
        unpaged: false,
        paged: false
    },
    totalElements: undefined,
    totalPages: undefined,
    last: false,
    first: false,
    size: undefined,
    number: undefined,
    sort: {
        sorted: false,
        unsorted: false,
        empty: false
    },
    numberOfElements: undefined,
    empty: false,
    selectedCourtyardId: undefined,
    loading: false,
    loaded: false,
    error: '',
};
//#endregion

//#region | Create operations.
export class Save implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] SAVE');
    readonly type = Save.actionType;

    constructor(public payload: Courtyard) {}
}

export class SaveSuccess implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] SAVE_SUCCESS');
    readonly type = SaveSuccess.actionType;
    constructor(public payload: IResponse<Courtyard>) {}

    static reduce(state: ResourceState, action: SaveSuccess): ResourceState {
        return {
            ...state,
            ...action.payload,
            loading: false,
            loaded: false,
        };
    }
}

export class SaveFail implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] SAVE_FAIL');
    readonly type = SaveFail.actionType;

    constructor(public payload: string) {}

    static reduce(state: ResourceState, action: SaveFail): ResourceState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload
        };
    }
}
//#endregion

//#region | Load operations.
export class FindById implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_BY_ID');
    readonly type = FindById.actionType;

    constructor(public CourtyardId: string) {}
}

export class FindByIdSuccess implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_BY_ID_SUCCESS');
    readonly type = FindByIdSuccess.actionType;

    constructor(public payload: IResponse<Courtyard>) {}

    static reduce(state: ResourceState, action: FindByIdSuccess): ResourceState {
        return {
            ...state,
            ...action.payload,
            loading: false,
            loaded: true
        };
    }
}

export class FindByIdFail implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_BY_ID_FAIL');
    readonly type = FindByIdFail.actionType;

    constructor(public payload: string) {}

    static reduce(state: ResourceState, action: FindByIdFail): ResourceState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload
        };
    }
}
//#endregion

//#region | Load operations.
export class FindAll implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_ALL');
    readonly type = FindAll.actionType;
}

export class FindAllSuccess implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_ALL_SUCCESS');
    readonly type = FindAllSuccess.actionType;

    constructor(public payload: IPageableResponse<Courtyard>) { }

    static reduce(state: ResourcePageState, action: FindAllSuccess): ResourcePageState {
        return {
            ...state,
            ...action.payload,
            loading: false,
            loaded: true
        };
    }
}

export class FindAllFail implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] FIND_ALL_FAIL');
    readonly type = FindAllFail.actionType;

    constructor(public payload: string) {}

    static reduce(state: ResourcePageState, action: FindAllFail): ResourcePageState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload
        };
    }
}
//#endregion

//#region | Delete operations.
export class Delete implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] DELETE');
    readonly type = Delete.actionType;

    constructor(public payload: Courtyard) {}
}

export class DeleteSuccess implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] DELETE_SUCCESS');
    readonly type = DeleteSuccess.actionType;

    constructor(public payload: IResponse<Courtyard>) { }

    static reduce(state: ResourceState, action: DeleteSuccess): ResourceState {
        return {
            ...state,
            loading: false,
            loaded: true
        };
    }
}

export class DeleteFail implements Action {
    static actionType: string = fromUtils.type('[COURTYARD] DELETE_FAIL');
    readonly type = DeleteFail.actionType;

    constructor(public payload: string) {}

    static reduce(state: ResourceState, action: DeleteFail): ResourceState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload
        };
    }
}
//#endregion


//#region | Reducer builder.
export const ResourceReducer = fromUtils.buildReducer(
    initialResourceState,
    SaveSuccess, SaveFail,
    FindByIdSuccess, FindByIdFail,
    DeleteSuccess, DeleteFail
);

export const ResourcePageReducer = fromUtils.buildReducer(
    initialPageState,
    FindAllSuccess, FindAllFail
);
//#endregion
