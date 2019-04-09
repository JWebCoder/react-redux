
import {
    SET_POSTS, SET_VOTE_POST, ADD_POST, SET_POST, REMOVE_POST,
    ADD_POST_TO_EDIT_LIST, REMOVE_POST_FROM_EDIT_LIST, SORT_POSTS_LIST, TOGGLE_ADDPOST_VISIBILITY
} from '../actionTypes/postTypes';

import { setCategory } from '../actions/categories'

export const setPosts = (posts) => {
    return {
        type: SET_POSTS, payload: { posts }
    }
}

export const setPost = (postId, post) => {
    return {
        type: SET_POST, payload: { postId, post }
    }
}

export const setVotePost = (postId, voteDirection) => {

    return {
        type: SET_VOTE_POST, payload: { postId, voteDirection }
    }
}

export const addPost = (post) => {
    return {
        type: ADD_POST, payload: { post }
    }
}

export const removePost = (postId) => {
    return {
        type: REMOVE_POST, payload: { postId }
    }
}

export const addPostToEditList = (postId) => {
    return {
        type: ADD_POST_TO_EDIT_LIST, payload: { postId }
    }
}
export const removePostFromEditList = (postId) => {
    return {
        type: REMOVE_POST_FROM_EDIT_LIST, payload: { postId }
    }
}

export const sortPostsList = (sort, sortDirection) => {

    return {
        type: SORT_POSTS_LIST, payload: { sort, sortDirection }
    }
}

export const toggleAddPostVisibility = () => {
    return {
        type: TOGGLE_ADDPOST_VISIBILITY
    }
}

export const fetchPosts = (categoryId) => {
    return (dispatch) => {
        let url = "http://localhost:3001/posts/"
        fetch(url, { headers: new Headers({ "Authorization": "Bearer" }) })
            .then(res => res.json())
            .then(res => { dispatch(setCategory(categoryId)); dispatch(setPosts(res)) });
    }
}

export const votePost = (postId, voteDirection) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/posts/${postId}`,
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify({ option: voteDirection })
            })
            .then(res => res.json())
            .then(res => dispatch(setVotePost(postId, voteDirection)));
    }
}

export const submitPost = (post) => {
    post.id = Date.now();

    return (dispatch) => {
        fetch(`http://localhost:3001/posts`,
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify(post)
            })
            .then(res => res.json())
            .then(res => dispatch(addPost(res)));
    }
}

export const fetchPost = (postId) => {
    return fetch(`http://localhost:3001/posts/${postId}`, { headers: new Headers({ "Authorization": "Bearer" }) })
        .then(res => res.json())
        .then(res => res);
}

export const editPost = (postId, post) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/posts/${postId}`,
            {
                method: 'PUT',
                headers: new Headers({ "Authorization": "Bearer", "Content-Type": "application/json" }),
                body: JSON.stringify(post)
            })
            .then(res => res.json())
            .then(res => {
                dispatch(setPost(postId, post));
                dispatch(removePostFromEditList(postId))
            })
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/posts/${postId}`,
            {
                method: 'DELETE',
                headers: new Headers({ "Authorization": "Bearer" })
            })
            .then(res => res.json())
            .then(res => {
                dispatch(removePost(postId));
            })
    }
}

export const fetchPostDetail = (postId) => {

    return (dispatch) => {
        fetchPost(postId).then(res =>dispatch(setPosts([res])))
    }
}

export const filterPostsByCategory = (posts, categoryId) => ([...posts].filter(post => (post.category === categoryId)))
