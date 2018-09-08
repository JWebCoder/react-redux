import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {ListPosts} from '../../components';
import {getListPosts} from "../../apiService/api";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : null
        }
    }
    componentDidMount(){
        getListPosts(args => this.setStatePost(args))
    }
    setStatePost(posts){
        this.setState({posts})
    }
    render() {
        const {posts} = this.state;
        return (
            <div>

                {posts&&<ListPosts posts={posts}/>}
            </div>
        )
    }
}
export default withRouter(Home)