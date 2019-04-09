
import { SET_CATEGORIES, SET_CATEGORY} from '../actionTypes/categoryTypes';

export const setCategory= (categoryId) => {
    return {
        type: SET_CATEGORY, payload: {categoryId}
    }
}

export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES, payload: categories
    }
}

export const fetchCategories = () => {

    return (dispatch) => {
        fetch("http://localhost:3001/categories", { headers: new Headers({ "Authorization": "Bearer" }) })
            .then(res => res.json(), (error) => console.log(error))
            .then(res => dispatch(setCategories(res)))
    }
}