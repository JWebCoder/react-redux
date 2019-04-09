
import { SET_TAB_SORT } from '../actionTypes/tabSort'
import { sortPostsList } from '../actions/posts'

export const TABSORTOPTIONS = {
    DATE: 'DATE',
    SCORE: 'SCORE'
}

export const setTabSort = (sort, sortDirection) => {
    return {
        type: SET_TAB_SORT, payload: { sort, sortDirection }
    }
}

export const setTabSortSortingPostList = (sort, sortDirection) => {
    return (dispatch, getState) => {
        //save changes to state
        dispatch(setTabSort(sort, sortDirection));
        let state = getState(); 
        dispatch(sortPostsList(state.tabSort.sort, state.tabSort.sortDirection))
    }
}