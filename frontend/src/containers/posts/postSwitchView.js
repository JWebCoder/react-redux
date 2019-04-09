import { connect } from 'react-redux'
import AddEditPost  from "./addEditPost";
import Post from "./post";
import React, { Component } from 'react';

class PostSwitchView extends Component 
{
   
    render()
    {
        if(this.props.editModeList.some((id) => id === this.props.id))
            return (<AddEditPost key={this.props.id} {...this.props}></AddEditPost>)
        else 
            return (<Post key={this.props.id} {...this.props}></Post>);
    }
}

const mapStateToProps = (state) => {

    return { editModeList: state.posts.editModeList }
}

export default connect(mapStateToProps, null)(PostSwitchView)
