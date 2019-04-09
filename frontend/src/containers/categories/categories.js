
import React, { Component } from 'react';
import './categories.css'
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/categories'
import CategoryLink from './categoryLink'
import {setCategory} from '../../actions/categories'
import { Link } from 'react-router-dom'
import { initialState } from '../../reducers/categories'

class Categories extends Component {

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    
    if (this.props.categories) {
      return <div className="categories-flex-container">
    <Link to="/" onClick={() => this.props.setCategory(initialState.selectedCategory)}>All</Link>
        {this.props.categories.map((category) => { return <CategoryLink key={category.name} onClick={this.onClick}{...category}></CategoryLink> })}
      </div>
    }
  }

  onClick(categoryId) {
    this.props.setCategory(categoryId);
  }
}

const mapDispatchToProps = (dispatch) => ({

  fetchCategories: () => {
    dispatch(fetchCategories())
  },
  setCategory: (categoryId) => {
    dispatch(setCategory(categoryId))
   }
})

const mapStateToProps = (state) => {
  return {categories: state.categories.categories }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)