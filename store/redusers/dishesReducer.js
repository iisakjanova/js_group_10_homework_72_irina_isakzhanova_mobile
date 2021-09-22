import {
    GET_DISHES_FAILURE,
    GET_DISHES_REQUEST,
    GET_DISHES_SUCCESS
} from "../actions/dishesActions";

const initialState = {
    dishes: '',
    loading: false,
};

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISHES_REQUEST:
            return {...state, loading: true};
        case GET_DISHES_SUCCESS:
            return {...state, loading: false, dishes: action.payload};
        case GET_DISHES_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default dishesReducer;