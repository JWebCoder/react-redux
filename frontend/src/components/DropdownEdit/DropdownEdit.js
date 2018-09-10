import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {votePost,deletePost} from '../../apiService/api';
import {updatePost} from '../../actions/post'
import {connect} from 'react-redux';
import moment from 'moment';
import EditPostForm from "../EditPostForm/EditPostForm";
class DropdownEdit extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modal:false,
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggleEdit() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleVotePost(id_post, option){
        votePost(id_post,option)
        this.props.updatePost(true)
    }
    handleDeletePost(id_post){
        deletePost(id_post)
        this.props.updatePost(true)
    }
    render() {
        return (
            <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                    <FontAwesome
                        name='wrench'
                    />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={()=>this.handleVotePost(this.props.id,'upVote')}>Vote up</DropdownItem>
                    <DropdownItem onClick={()=>this.handleVotePost(this.props.id,'downVote')}>Vote down</DropdownItem>
                    <DropdownItem onClick={()=>this.toggleEdit()}>Edit</DropdownItem>
                    <DropdownItem onClick={()=>this.handleDeletePost(this.props.id)}>Delete</DropdownItem>
                </DropdownMenu>
                <EditPostForm modal={this.state.modal} toggle={()=>this.toggleEdit()} {...this.props} editPost={true}/>
            </Dropdown>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updatePost: newState => {
            dispatch(updatePost(newState));
        },
    };
}
export default connect(null,mapDispatchToProps)(DropdownEdit)