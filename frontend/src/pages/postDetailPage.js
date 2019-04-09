import React from 'react';
import PostDetail from '../containers/posts/postDetail';
import { withRouter } from "react-router";

const PostDetailPage = (props) =>
{
    return (<div>
            <br/>
            <PostDetail></PostDetail>
            <br></br>
            <button onClick={ () => props.history.push("/")}> Back </button>
           </div>)
}

export default withRouter(PostDetailPage);