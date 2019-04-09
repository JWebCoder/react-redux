import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class CategoryLink extends Component
{   
    constructor()
    {   super();
        this.onClick = this.onClick.bind(this);
    }
    render()
    {
        return <Link onClick={this.onClick} key={this.props.name} to={`/categories/${this.props.name}`}> {this.props.name}</Link>
    }
    onClick()
    {
        this.props.onClick(this.props.name);
    }
}
export default CategoryLink