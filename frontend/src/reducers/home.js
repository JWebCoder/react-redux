import { SORT_BY_CATEGORY, SORT_BY_CRITERIA } from '../actions/ActionTypes';

export default (state = {}, action) =>{
    switch (action.type) {
        case SORT_BY_CATEGORY:
            return {
                ...state,
                category: action.payload.name,
                cate_path: action.payload.path
            };
        case SORT_BY_CRITERIA:
            return {
                ...state,
                sortBy: action.payload.sortBy,
            };
        default:
            return state;
    }
}
