import { Action } from '@ngrx/store';

export namespace fromUtils {

    const typeCache: { [label: string]: boolean } = {};

    export function type(label: string = ''): string {
        if (typeCache[label]) {
            throw new Error(`Action type "${label}" is not unique"`);
        }
        typeCache[label] = true;
        return label;
    }

    export function buildReducer<T>(initial: T, ...actionClasses: {
            actionType: string, reduce: (state: T, action: Action) => T
        }[]) {

        const handlers: { [key: string]: (state: T, action: Action) => T } = {};
        actionClasses.forEach((ac) => handlers[ac.actionType] = ac.reduce);

        return (state: T = initial, action: Action) => handlers[action.type] ?
            handlers[action.type](state, action) :
            state;
    }
}