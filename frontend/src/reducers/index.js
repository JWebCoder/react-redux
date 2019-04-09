import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import tabSort from './tabSort'

export default combineReducers({
  categories, 
  posts, 
  tabSort
})