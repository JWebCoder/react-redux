import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Button} from 'reactstrap';
import {ListPosts, FilterBar} from '../../components';
import {getListPosts, getPostsByCategory} from "../../apiService/api";
import {LayoutContext} from '../../util/context'
import {connect} from "react-redux";
import {orderBy} from 'lodash';
import {updatePost} from "../../actions/post";
import EditPostForm from '../../components/EditPostForm/EditPostForm';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : null,
            modal:false,
        }
    }
    componentDidMount(){
        getListPosts(args => this.sortPostByCriteria(args))
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.category !== prevProps.category){
            this.updateListPost()
        }
        if(this.props.sortBy !== prevProps.sortBy){
            this.sortPostByCriteria(this.state.posts)
        }
        if(this.props.postUpdate){
            this.updateListPost()
            this.props.updatePost(false)
        }
    }
    toggleEdit() {
        this.setState({
            modal: !this.state.modal
        });
    }
    updateListPost(){
        if(this.props.category==='all'||!this.props.category){
            getListPosts(args => this.sortPostByCriteria(args))
        }else{
            getPostsByCategory(this.props.category,args => this.sortPostByCriteria(args))
        }
    }

    sortPostByCriteria(posts){
        if(this.props.sortBy){
            this.setState({
                posts: orderBy(posts, [this.props.sortBy],['asc'])
            })
        }else{
            this.setState({posts})
        }

    }
    render() {
        const {posts} = this.state;
        const {history} = this.props;
        const value = {
            history
        }
        return (
            <LayoutContext.Provider value={value}>
            <div>
                <FilterBar/>
                {posts&&<ListPosts posts={posts}/>}
                <Button color="primary" className='float-right mt-3' onClick={()=>this.toggleEdit()}>New Post</Button>
                <EditPostForm modal={this.state.modal} toggle={()=>this.toggleEdit()}/>
            </div>
            </LayoutContext.Provider>
        )
    }
}
function mapStateToProps(state) {
    return {
        category: state.home.category,
        sortBy: state.home.sortBy,
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))