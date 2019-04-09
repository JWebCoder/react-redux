
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/posts'
import { withRouter } from "react-router";
import PostSwitchView from './postSwitchView'
import { filterPostsByCategory} from '../../actions/posts'
import ToggleComments from '../comments/toggleComments';
import {initialState} from '../../reducers/categories'

class Posts extends Component {

    componentDidMount() {

        if (this.props.history.location.pathname.includes("categories"))
        {
            this.props.fetchPosts(this.props.match.params.name);
        }
        else
            this.props.fetchPosts(initialState.selectedCategory)
    }

    render() {
         return this.props.posts.map(post => {
            return ([<PostSwitchView key={post.id} {...post}></PostSwitchView>,
            <ToggleComments key={`tc${post.id}`} postId={post.id}></ToggleComments>])
        })
    }
}

const mapDispatchToProps = (dispatch) => ({

    fetchPosts: (category) => dispatch(fetchPosts(category))
})
    
const mapStateToProps = (state) => {

    return {
        
        posts: state.categories.selectedCategory === initialState.selectedCategory ? state.posts.posts : filterPostsByCategory(state.posts.posts, 
            state.categories.selectedCategory )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))