

import React, { Component } from 'react';
import Post from '../posts/post'
import { withRouter } from "react-router";
import {fetchPostDetail} from '../../actions/posts'
import { connect } from 'react-redux'

class PostDetail extends Component {

    componentDidMount() {
        let postId = this.props.match.params.id;
        this.props.fetchPostDetail(postId)
    }

    render() {
        
        return this.props.posts ?
            <Post {...this.props.posts[0]} detailMode></Post>: null
    }
}
const mapDispatchToProps = (dispatch) => ({

    fetchPostDetail: (postId) => dispatch(fetchPostDetail(postId))
})
 
const mapStateToProps = (state) => {

    return {
        posts: state.posts.posts
    }    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))