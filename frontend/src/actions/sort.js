import {SORT_BY_CATEGORY,SORT_BY_CRITERIA} from './ActionTypes'
export function sortByCategory({ name, path }) {
    return {
        type: SORT_BY_CATEGORY,
        payload: {
            name,
            path,
        },
    };
}
export function sortByCritera(sortBy) {
    return {
        type: SORT_BY_CRITERIA,
        payload: {
            sortBy
        },
    };
}