
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form ,FormGroup,Label, Input} from 'reactstrap';
import {editComment,saveComment} from "../../apiService/api";
import {getID} from "../../util/util";
import {updatePost} from "../../actions/post";
import {connect} from "react-redux";

class EditCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            options:[]
        };
    }
    componentDidMount(){
        const {author, body} = this.props;
        this.setState({
            author, body
        })
    }

    onChangeForm(name,value){
        this.setState({
            [name]:value
        })
    }
    saveEdit(){
        const {author, body} = this.state;
        const{voteScore,id,} = this.props;
        const post ={
            id,
            author,
            body,
            voteScore,
            timestamp :new Date().getTime()
        }
        editComment(post);

    }
    saveNewPost(){
        const {author, body} = this.state;
        const post ={
            id: getID(),
            parentId: this.props.parentId,
            author,
            body,
            timestamp :new Date().getTime()
        }
        saveComment(post)
    }
    handleSave(){
        if(this.props.editPost){
            this.saveEdit()
        }else {
            this.saveNewPost()
        }
        this.props.updatePost(true)
        this.props.toggle()
    }

    render() {
        const {author, body} = this.state;
        return (
            <div>
                <Modal isOpen={this.props.modal}>
                    <ModalHeader toggle={this.toggle}>Edit post</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Author</Label>
                                <Input type="text" name="author" id="author" value={author} onChange={e => this.onChangeForm('author',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Body</Label>
                                <Input type="text" name="body" id="body" value={body} onChange={e => this.onChangeForm('body',e.target.value)}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>this.handleSave()}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
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
export default connect(null,mapDispatchToProps)(EditCommentForm);