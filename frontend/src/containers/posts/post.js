import React, { Component } from 'react';
import VoteButton from '../../components/voteButton';
import { connect } from 'react-redux'
import { addPostToEditList } from '../../actions/posts'
import { deletePost } from '../../actions/posts'
import { togglePostComments } from '../../actions/comments'
import { votePost } from '../../actions/posts'
import { withRouter } from "react-router";

export class Post extends Component {

    render() {

        return (
            <div key={this.props.id}> Category: {this.props.category} Title: {this.props.title} Body: {this.props.body}, Author:{this.props.author}, commentCount: {this.props.commentCount},
             voteScore:{this.props.voteScore} Date: {(new Date(this.props.id)).toString()}
                <VoteButton onClick={this.props.votePost} entityId={this.props.id} voteDirection="upVote">Up Vote</VoteButton>
                <VoteButton onClick={this.props.votePost} entityId={this.props.id} voteDirection="downVote">Down Vote</VoteButton>
                {!this.props.detailMode && <button onClick={() => this.props.addPostToEditList(this.props.id)}>Edit</button>}
                {!this.props.detailMode && <button onClick={() => this.props.deletePost(this.props.id)}>Delete</button>}
                {!this.props.detailMode && <button onClick={() => this.props.togglePostComments(this.props.id)}>Comments</button>}
                {!this.props.detailMode && <button onClick={() => this.props.history.push(`/post/${this.props.id}`)}>Detail</button>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>
    ({
        addPostToEditList: (postId) => {
            dispatch(addPostToEditList(postId))
        },
        deletePost: (postId) => {
            dispatch(deletePost(postId))
        },
        togglePostComments: (postId) => {
            dispatch(togglePostComments(postId))
        },
        votePost: (entityId, voteDirection) => {
            dispatch(votePost(entityId, voteDirection))
        }
    })

export default withRouter(connect(null, mapDispatchToProps)(Post))