import {
    ADD_DISH_TO_CART
} from "../actions/ordersActions";

const initialState = {
    order: '',
    loading: false,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DISH_TO_CART:
            if (!state.order[action.payload.id]) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        [action.payload.id]: {
                            title: action.payload.title,
                            qty: 1,
                            totalPrice: action.payload.price,
                        },
                    },
                };
            }

            return {
                ...state,
                order: {
                    ...state.order,
                    [action.payload.id]: {
                        title: action.payload.title,
                        qty: state.order[action.payload.id].qty + 1,
                        totalPrice: state.order[action.payload.id].totalPrice + action.payload.price,
                    },
                },
            };
        default:
            return state;
    }
};

export default ordersReducer;