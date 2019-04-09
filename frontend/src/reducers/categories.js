
export const initialState = {
    categories: [],
    selectedCategory: "ALL"
}

const categories = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_CATEGORIES':
            {
                return { ...state, categories: action.payload.categories };
            }
        case 'SET_CATEGORY':
            {
                return { ...state, selectedCategory: action.payload.categoryId };
            }
        default:
            {
                return state;
            }
    }
}

export default categories