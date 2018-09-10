import React, { Component } from 'react';
import moment from 'moment';
import './style.css';
import {deleteComment, voteComment} from "../../apiService/api";
import {updatePost} from "../../actions/post";
import {connect} from "react-redux";
import EditCommmentForm from '../EditCommentForm/EditCommentForm';
import FontAwesome from 'react-fontawesome';

class ListComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal:false,
        };
    }

    toggleEdit() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleVotePost(id_post, option){
        voteComment(id_post,option)
        this.props.updatePost(true)
    }
    handleDeletePost(id_post){
        deleteComment(id_post)
        this.props.updatePost(true)
    }
    render(){
        return (
            <div className='container-fluid'>
                {this.props.comments.map(c => (
                    <div className='comment'>
                        <div className='authorCommment'>By: <b>{c.author}</b></div>
                        <div>{c.body}</div>
                        <div className='criterialCommment'>Vote Score: {c.voteScore}    {moment(c.timestamp).format('LLL')}</div>
                        <div>

                            <span className='itemEvent' onClick={()=>this.handleVotePost(c.id,'upVote')}>
                                <FontAwesome
                                    name='thumbs-up'
                                    style={{color:'blue'}}
                                />
                            </span>
                            <span className='itemEvent' onClick={()=>this.handleVotePost(c.id,'downVote')}>
                                <FontAwesome
                                    name='thumbs-down'
                                    style={{color:'red'}}
                                />
                            </span>
                            <span className='itemEvent' onClick={()=>this.toggleEdit()}>
                                <FontAwesome
                                    name='wrench'
                                />
                            </span>
                            <span className='itemEvent' onClick={()=>this.handleDeletePost(c.id)}>
                                <FontAwesome
                                    name='trash'
                                />
                            </span>
                            <EditCommmentForm modal={this.state.modal} toggle={()=>this.toggleEdit()} {...c} editPost={true} parentID={this.props.parentId}/>

                        </div>
                    </div>
                ))}
            </div>
        )
    }}
function mapDispatchToProps(dispatch) {
    return {
        updatePost: newState => {
            dispatch(updatePost(newState));
        },
    };
}
export default connect(null,mapDispatchToProps) (ListComments)