import { connect } from 'react-redux'
import React, { Component } from 'react';
import AddEditComment from './addEditComment'
import Comment from  '../../components/comments/comment'

class CommentSwitchView extends Component 
{
   
    render()
    {
        if(this.props.commentsInEditMode.some((id) => id === this.props.id))
            return (<AddEditComment key={this.props.id} {...this.props}></AddEditComment>)
        else 
            return (<Comment key={this.props.id} {...this.props}></Comment>);
    }
}

const mapStateToProps = (state) => {

    return { commentsInEditMode: state.posts.commentsInEditMode }
}

export default connect(mapStateToProps, null)(CommentSwitchView)
