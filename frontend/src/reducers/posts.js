
const initialState = {
    posts: [],
    editModeList: [],
    addPostVisibility: false,
    postCommentsVisible: [],
    commentsInEditMode: []
}

const posts = (state = initialState, action) => {

    switch (action.type) {

        // Posts
        case 'SET_POSTS':
            {
                return { ...state, posts: action.payload.posts }
            }

        case 'SET_POST':
            {
                let newState = { ...state, posts: [...state.posts] }

                let post = newState.posts.find(post => post.id === action.payload.postId);

                post.title = action.payload.post.title;
                post.body = action.payload.post.body;
                post.author = action.payload.post.author;
                post.category = action.payload.post.category;

                return newState;
            }
        case 'SET_VOTE_POST':
            {
                let newState = { ...state, posts: [...state.posts] }

                let post = newState.posts.find(post => post.id === action.payload.postId);

                post.voteScore = action.payload.voteDirection === 'upVote' ?
                    ++post.voteScore : action.payload.voteDirection === 'downVote' ?
                        --post.voteScore : post.voteScore

                return newState;
            }
        case 'ADD_POST':
            {
                let newState = { ...state, posts: [...state.posts] };
                newState.posts.push(action.payload.post)
                return newState;
            }
        case 'REMOVE_POST':
            {
                let newState = { ...state, posts: [...state.posts] };
                let indexOf = newState.posts.findIndex((post) => post.id === action.payload.postId);
                if (indexOf !== -1) {
                    newState.posts.splice(indexOf, 1);
                }

                return newState;
            }
        case 'ADD_POST_TO_EDIT_LIST':
            {
                let newState = { ...state, editModeList: [...state.editModeList] };
                newState.editModeList.push(action.payload.postId)
                return newState;
            }
        case 'REMOVE_POST_FROM_EDIT_LIST':
            {
                let newState = { ...state, editModeList: [...state.editModeList] };

                var indexOf = newState.editModeList.findIndex((value) => value === action.payload.postId);

                if (indexOf !== -1) {
                    newState.editModeList.splice(indexOf, 1);
                }

                return newState;
            }
        case 'SORT_POSTS_LIST':
            {

                let newState = { ...state, posts: [...state.posts] }

                switch (action.payload.sort) {
                    case "DATE":
                        {
                            if (action.payload.sortDirection === "ASC")
                                newState.posts.sort((item, next) => { return (item.id - next.id) })
                            else
                                if (action.payload.sortDirection === "DESC")
                                    newState.posts.sort((item, next) => { return (next.id - item.id) })
                            break;
                        }

                    case "SCORE":
                        {
                            if (action.payload.sortDirection === "ASC")
                                newState.posts.sort((item, next) => { return (item.voteScore - next.voteScore) })
                            else
                                if (action.payload.sortDirection === "DESC")
                                    newState.posts.sort((item, next) => { return (next.voteScore - item.voteScore) })
                            break;
                        }
                    default:
                        break;
                }

                return newState;
            }
        case 'TOGGLE_ADDPOST_VISIBILITY':
            {
                return { ...state, addPostVisibility: !state.addPostVisibility }
            }
        case "SET_CATEGORY":
            {
                return { ...state, filteringActive: true }
            }

        //Comments
        case "ADD_COMMENT":
            {
                let newState = { ...state, posts: [...state.posts] };

                let post = newState.posts.find((post) => post.id === action.payload.postId)

                post.commentCount++;

                if (!post.comments) {
                    post.comments = [action.payload.comment];
                }
                else
                    post.comments.push(action.payload.comment)

                return newState;
            }
        case "SET_COMMENTS":
            {
                let newState = { ...state, posts: [...state.posts] };

                let post = newState.posts.find((post) => post.id === action.payload.postId)

                post.comments = action.payload.comments;

                return newState;
            }
        case "TOGGLE_POST_COMMENTS":
            {
                let newState = { ...state, postCommentsVisible: [...state.postCommentsVisible] };
                let indexOf = newState.postCommentsVisible.findIndex((id) => id === action.payload.postId);
                if (indexOf !== -1)
                    newState.postCommentsVisible.splice(indexOf, 1);
                else
                    newState.postCommentsVisible.push(action.payload.postId)

                return newState;
            }

        case "SET_VOTE_COMMENT":
            {

                let newState = { ...state, posts: [...state.posts] };

                for (let i = 0; i < newState.posts.length; i++) {

                    if (newState.posts[i].comments) {
                        let comment = newState.posts[i].comments.find((comment) => comment.id === action.payload.commentId);

                        if (action.payload.voteDirection === 'upVote')
                            comment.voteScore++;
                        else
                            if (action.payload.voteDirection === 'downVote')
                                comment.voteScore--;

                        break;
                    }
                }

                return newState;
            }
        case "REMOVE_COMMENT":
            {

                let newState = { ...state, posts: [...state.posts] };

                for (let i = 0; i < newState.posts.length; i++) {

                    if (newState.posts[i].comments) {

                        let indexOf = newState.posts[i].comments.findIndex((comment) =>

                            comment.id === action.payload.commentId

                        );

                        if (indexOf !== -1) {
                            newState.posts[i].comments.splice(indexOf, 1);
                            break;
                        }
                    }
                }

                return newState;
            }
        case 'ADD_COMMENT_TO_EDIT_LIST':
            {
                let newState = { ...state, commentsInEditMode: [...state.commentsInEditMode] };
                newState.commentsInEditMode.push(action.payload.commentId)
                return newState;
            }
        case 'REMOVE_COMMENT_FROM_EDIT_LIST':
            {

                let newState = { ...state, commentsInEditMode: [...state.editModeList] };

                let indexOf = newState.commentsInEditMode.findIndex((value) => value === action.payload.categoryId);

                if (indexOf !== -1) {
                    newState.commentsInEditMode.splice(indexOf, 1);
                }

                return newState;
            }
        case 'SET_COMMENT':
            {

                let newState = { ...state, posts: [...state.posts] };

                for (let i = 0; i < newState.posts.length; i++) {

                    if (newState.posts[i].comments) {

                        let comment = newState.posts[i].comments.find((comment) =>

                            comment.id === action.payload.commentId

                        );

                        comment.body = action.payload.comment.body;
                        comment.author = action.payload.comment.body

                        break;
                    }
                }

                return newState;
            }
        default:
            {
                return state;
            }
    }
}

export default posts;