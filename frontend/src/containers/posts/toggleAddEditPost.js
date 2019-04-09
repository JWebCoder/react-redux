import { connect } from 'react-redux'
import AddEditPost from "./addEditPost";
import React, { Component } from 'react';

class ToggleAddEditPost extends Component {
    render() {
        return this.props.isVisible ? <AddEditPost></AddEditPost> : null
    }
}

const mapStateToProps = (state) => {

    return { isVisible: state.posts.addPostVisibility }
}

export default connect(mapStateToProps, null)(ToggleAddEditPost)