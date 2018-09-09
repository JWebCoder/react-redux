import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {ListPosts, FilterBar} from '../../components';
import {getListPosts, getPostsByCategory} from "../../apiService/api";
import {LayoutContext} from '../../util/context'
import {connect} from "react-redux";
import {orderBy} from 'lodash';

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
    componentDidUpdate(prevProps, prevState){
        if(this.props.category !== prevProps.category){
            if(this.props.category==='all'){
                getListPosts(args => this.setStatePost(args))
            }else{
                getPostsByCategory(this.props.category,args => this.setStatePost(args))
            }
        }
        if(this.props.sortBy !== prevProps.sortBy){
            this.sortPostByCriteria(this.props.sortBy)
        }
    }
    setStatePost(posts){
        this.setState({posts})
    }
    sortPostByCriteria(criteria){
        const {posts} = this.state;
        this.setState({
            posts: orderBy(posts, [criteria],['asc'])
        })
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
            </div>
            </LayoutContext.Provider>
        )
    }
}
function mapStateToProps(state) {
    return {
        category: state.home.category,
        sortBy: state.home.sortBy,
    };
}
export default withRouter(connect(mapStateToProps)(Home))