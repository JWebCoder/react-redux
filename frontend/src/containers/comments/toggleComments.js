import React, { Component } from 'react';
import Comments from './comments'
import { connect } from 'react-redux'

class ToggleComments extends Component {
    render() {
        return this.props.postCommentsVisible &&
            this.props.postCommentsVisible.some(postId => postId === this.props.postId) ? <Comments key={this.props.postId} postId={this.props.postId}></Comments>: null
    }
}

const mapStateToProps = (state) => {
    
    return { postCommentsVisible: state.posts.postCommentsVisible }
}

export default connect(mapStateToProps, null)(ToggleComments)