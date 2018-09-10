import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Row, Col, Navbar, NavbarBrand, Button} from 'reactstrap';
import moment from 'moment';
import {getPostDetail, getAllCommentsOfPost} from '../../apiService/api';
import {ListComments,EditCommentForm} from '../../components'
import {connect} from "react-redux";
import {updatePost} from "../../actions/post";
class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post:null,
            comments:null,
            modal:false,
        }
    }
    componentDidMount(){
        const {match:{params:{category, postId}}} = this.props;
        getPostDetail(postId, args => this.getPostDetail(args))
        getAllCommentsOfPost(postId, args => this.getComments(args))
    }
    componentDidUpdate(prevProps, prevState){
            if(this.props.postUpdate){
               const {match:{params:{postId}}} = this.props;
               getAllCommentsOfPost(postId, args => this.getComments(args))
            this.props.updatePost(false)
        }
    }
    getPostDetail(data){
        this.setState({
            post: data
        })
    }
    getComments(data){
        console.log("data",data)
        this.setState({
            comments: data
        })
    }
    toggleEdit(){
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        const {post,comments} = this.state;
        return (
            post&&<div className='container-fluid'>
                <Navbar color="dark">
                    <NavbarBrand href="/" className="mr-auto" style={{color:'#fff'}}>Home</NavbarBrand>
                </Navbar>
                    <div className='container'>
                        <Row className='pt-3'>
                            <h3 className='title'>{post.title}</h3>
                        </Row>
                        <Row>
                            <div>
                                {post.body}
                            </div>
                        </Row>
                        <Row className='criteriaPost'>
                            <Col className='col-2'>Date: <b>{moment(post.timestamp).format('LLL')}</b></Col>
                            <Col className='col-2'>By: <b>{post.author}</b></Col>
                            <Col  className='col-2'>Category: <b>{post.category}</b></Col>
                            <Col  className='col-2'>Vote Score: <b>{post.voteScore}</b></Col>

                        </Row>
                        <Row>
                            <h6 className='comments'>Comments({post.commentCount})</h6>
                            {comments&&<ListComments comments={comments} parentId={post.id}/>}
                            <Button color="primary" onClick={()=>this.toggleEdit()}>Add comment</Button>
                            <EditCommentForm modal={this.state.modal} toggle={()=>this.toggleEdit()}  parentId={post.id}/>
                        </Row>
                    </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        postUpdate:state.post.postUpdate
    };
}
function mapDispatchToProps(dispatch) {
    return {
        updatePost: newState => {
            dispatch(updatePost(newState));
        },
    };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail))