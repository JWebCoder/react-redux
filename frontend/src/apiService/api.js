const url = "http://localhost:3001";

const headers = {
    'Accept': 'application/json',
    'Authorization': 'token'
}
// Categoty
export const getListCategories = () =>
    fetch(`${url}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);

// Post
export const getListPosts = (callback) =>
    fetch(`${url}/posts`, { headers })
        .then(res => res.json())
        .then(posts => {callback(posts)});

export const getPostDetail = (Id) =>
    fetch(`${url}/posts/${Id}`, { headers })
        .then(res => res.json())

export const getPostsByCategory = (category) =>
    fetch(`${url}/${category}/posts`, { headers })
        .then(res => res.json());

export const savePost = (post) =>
    fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

export const editPost = (post) =>
    fetch(`${url}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

export const deletePost = (post_id) =>
    fetch(`${url}/posts/${post_id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());

export const votePost = (post_id, voteOption) =>
    fetch(`${url}/posts/${post_id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteOption)
    }).then(res => res.json());

// Comment
export const getAllCommentsOfPost = (post_id) =>
    fetch(`${url}/posts/${post_id}/comments`, { headers })
        .then(res => res.json());

export const getCommentDetail = (comment_id) =>
    fetch(`${url}/comments/${comment_id}`, { headers })
        .then(res => res.json());

export const saveComment = (comment) =>
    fetch(`${url}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const editComment = (comment) =>
    fetch(`${url}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const deleteComment = (comment_id) =>
    fetch(`${url}/comments/${comment_id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());

export const voteComment = (comment_id, typeVote) =>
    fetch(`${url}/comments/${comment_id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(typeVote)
    }).then(res => res.json());