
import Posts from '../containers/posts/posts'
import React from 'react';
import TabSort from '../components/tabs/tabSort';
import ToggleAddEditPost from '../containers/posts/toggleAddEditPost'
import AddPostButton from '../containers/posts/addPostButton'

const PostsPage = (props) => {
    return (<div>
        <TabSort></TabSort>
        <AddPostButton></AddPostButton>
        <br />
        <ToggleAddEditPost />
        <br />
        <Posts></Posts>
    </div>)
}

export default PostsPage;