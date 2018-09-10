import {UPDATE_POST} from './ActionTypes'
export function updatePost(postUpdate) {
    return {
        type: UPDATE_POST,
        payload: {
            postUpdate
        },
    };
}