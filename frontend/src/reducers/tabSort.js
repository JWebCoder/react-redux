const initialState =
{
    sort: "",
    sortDirection: ""
}

const tabSort = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_TAB_SORT':
            {
                let newState = { ...state };

                //initial state
                if (newState.sort === "") {
                    newState.sort = action.payload.sort;
                    newState.sortDirection = action.payload.sortDirection
                }
                else {
                    if (newState.sort === action.payload.sort) {
                        newState.sortDirection === "ASC" ? newState.sortDirection = "DESC" :
                            newState.sortDirection = "ASC"
                    }
                    else {
                        newState.sort = action.payload.sort;
                        newState.sortDirection = action.payload.sortDirection
                    }
                }

                return newState;
            }
        case 'SET_CATEGORY':
            {
                return {...state, sort:"", sortDirection:""}
            }

        default:
            return state
    }
}

export default tabSort