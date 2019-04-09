//file created just for easily maintenance
//management state is done by posts reducer

import {
    SET_COMMENTS,
    ADD_COMMENT,
    TOGGLE_POST_COMMENTS,
    SET_VOTE_COMMENT,
    REMOVE_COMMENT,
    ADD_COMMENT_TO_EDIT_LIST,
    REMOVE_COMMENT_FROM_EDIT_LIST, 
    SET_COMMENT
} from '../actionTypes/commentTypes';


export const setComments = (postId, comments) => {
    return {
        type: SET_COMMENTS, payload: { postId, comments }
    }
}

export const addComment = (postId, comment) => {

    return {
        type: ADD_COMMENT, payload: { postId, comment }
    }
}

export const togglePostComments = (postId) => {

    return {
        type: TOGGLE_POST_COMMENTS, payload: { postId }
    }
}

export const setVoteComment = (commentId, voteDirection) => {

    return {
        type: SET_VOTE_COMMENT, payload: { commentId, voteDirection }
    }
}

export const removeComment = (commentId) => {

    return {
        type: REMOVE_COMMENT, payload: { commentId }
    }
}

export const addCommentToEditList = (commentId) => {

    return {
        type: ADD_COMMENT_TO_EDIT_LIST, payload: { commentId }
    }
}
export const removeCommentFromEditList = (commentId) => {
    return {
        type: REMOVE_COMMENT_FROM_EDIT_LIST, payload: { commentId }
    }
}

export const setComment = (commentId, comment) => {
    return {
        type: SET_COMMENT, payload: { commentId, comment }
    }
}

export const fetchComments = (postId) => {
    return (dispatch) => {

        fetch(`http://localhost:3001/posts/${postId}/comments`, { headers: new Headers({ "Authorization": "Bearer" }) })
            .then(res => res.json())
            .then(res => dispatch(setComments(postId, res)))
    }
}

export const fetchComment = (commentId) => {
    return fetch(`http://localhost:3001/comments/${commentId}`, { headers: new Headers({ "Authorization": "Bearer" }) })
        .then(res => res.json())

}

export const submitComment = (postId, comment) => {

    comment.id = Date.now().toString();
    return (dispatch) => {

        fetch(`http://localhost:3001/comments`,
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify(comment)
            })
            .then(res => res.json())
            .then(res => dispatch(addComment(postId, res)));
    }
}

export const voteComment = (commentId, voteDirection) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/comments/${commentId}`,
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify({ option: voteDirection })
            })
            .then(res => res.json())
            .then(res => dispatch(setVoteComment(commentId, voteDirection)))
    }
}

export const deleteComment = (commentId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/comments/${commentId}`,
            {
                method: 'DELETE',
                headers: new Headers({ "Authorization": "Bearer" })
            })
            .then(res => res.json())
            .then(res => {
                dispatch(removeComment(commentId));
            })
    }
}


export const editComment = (commentId, comment) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/comments/${commentId}`,
            {
                method: 'PUT',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify(comment)
            })
            .then(res => res.json())
            .then(res => {
                dispatch(setComment(commentId, comment));
                dispatch(removeCommentFromEditList(commentId))
            })
    }
}