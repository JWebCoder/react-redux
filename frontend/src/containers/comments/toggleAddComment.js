import { connect } from 'react-redux'
import React, { Component } from 'react';

class ToggleAddEditComment extends Component {
    render() {
        return this.props.isVisible ? <AddEditComment></AddEditComment> : null
    }
}

const mapStateToProps = (state) => {

    return { isVisible: state.posts.addCommentVisibility }
}

export default connect(mapStateToProps, null)(ToggleAddEditComment)