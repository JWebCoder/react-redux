import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleAddPostVisibility } from '../../actions/posts'
import Button from '../../components/button'

class AddPostButton extends Component{

    render() {
        return (<Button children="Add New Post" onClick={this.props.toggleAddPostVisibility}></Button>)
    }

}

const mapDispatchToProps = (dispatch) => ({

    toggleAddPostVisibility: () => {
        dispatch(toggleAddPostVisibility())
    }
})


export default connect(null, mapDispatchToProps)(AddPostButton)