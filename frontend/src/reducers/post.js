import { UPDATE_POST } from '../actions/ActionTypes';

export default (state = {}, action) =>{
    switch (action.type) {
        case UPDATE_POST:
            return {
                ...state,
                postUpdate: action.payload.postUpdate,
            };

        default:
            return state;
    }
}
