import React, { Component } from 'react';

export default class VoteButton extends Component {

    constructor(props)
    {   super(props)
        this.onClick = this.onClick.bind(this)
    }
    render() {
        return (
            <button onClick={this.onClick}>{this.props.children}</button>)
    }
    onClick() 
    {
        this.props.onClick(this.props.entityId,this.props.voteDirection);
    }
}