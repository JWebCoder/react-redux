
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form ,FormGroup,Label, Input} from 'reactstrap';
import {getListCategories, editPost,savePost} from "../../apiService/api";
import {getID} from "../../util/util";
import {updatePost} from "../../actions/post";
import {connect} from "react-redux";

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            options:[]
        };
    }
    componentDidMount(){
        const {title,author,category, body} = this.props;
        getListCategories(args => this.setOptions(args))
        this.setState({
            title,author,category, body
        })
    }
    setOptions(options){
        this.setState({options})
    }
    onChangeForm(name,value){
        this.setState({
            [name]:value
        })
    }
    saveEdit(){
        const {title,author,category, body,options} = this.state;
        const{voteScore,id,deleted,totalComments} = this.props;
        const post ={
            id,
            title,
            author,
            category:category?category:options[0].name,
            body,
            voteScore,
            deleted,
            totalComments,
            timestamp :new Date().getTime()
        }
        editPost(post);

    }
    saveNewPost(){
        const {title,author,category, body} = this.state;
        const post ={
            id:getID(),
            title,
            author,
            category,
            body,
            timestamp :new Date().getTime()
        }
        savePost(post)
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
        const {title,author,category, body} = this.state;
        return (
            <div>
                <Modal isOpen={this.props.modal}>
                    <ModalHeader toggle={this.toggle}>Edit post</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input type="text" name="title" id="title" value={title}  onChange={e => this.onChangeForm('title',e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Author</Label>
                                <Input type="text" name="author" id="author" value={author} onChange={e => this.onChangeForm('author',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Body</Label>
                                <Input type="text" name="body" id="body" value={body} onChange={e => this.onChangeForm('body',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Category</Label>
                                <Input type="select" name="category" id="category" onChange={e => this.onChangeForm('category',e.target.value)}>
                                    {this.state.options.map((o,i)=><option selected={category?o.name===category: i===0}>{o.name}</option>)}
                                </Input>
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
export default connect(null,mapDispatchToProps)(EditPostForm);