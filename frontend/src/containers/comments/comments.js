
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchComments} from '../../actions/comments'
import {voteComment} from '../../actions/comments'
import {deleteComment} from '../../actions/comments'
import AddEditComment from './addEditComment'
import CommentSwitchView from '../../containers/comments/commentSwitchView'
import { addCommentToEditList} from '../../actions/comments'

class Comments extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId);
    }

    render() {

        const comments = this.props.posts.find(p=>p.id === this.props.postId).comments;
     
        return ([
        <AddEditComment key={this.props.postId} postId={this.props.postId}></AddEditComment>,
        comments && comments.map(comment => {

            return <CommentSwitchView onVote={this.props.voteComment} onDelete={this.props.deleteComment} onEdit={this.props.addCommentToEditList} key={comment.id} {...comment}></CommentSwitchView>
        })])
    }
}

const mapDispatchToProps = (dispatch) => ({

    fetchComments: (postId) => dispatch(fetchComments(postId)),
    voteComment: (entityId, voteDirection) => {
        dispatch(voteComment(entityId,voteDirection))
    },
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    addCommentToEditList: (commentId) => {
        dispatch(addCommentToEditList(commentId))
    }
})

const mapStateToProps = (state) => {

    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
