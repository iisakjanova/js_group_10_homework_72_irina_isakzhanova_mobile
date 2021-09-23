import {
    ADD_DISH_TO_CART,
    REMOVE_DISH_FROM_CART,
    SHOW_MODAL
} from "../actions/ordersActions";

const initialState = {
    order: '',
    loading: false,
    showModal: false,
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
        case REMOVE_DISH_FROM_CART:
            const {[action.payload]: _, ...restDishes} = state.order;

            return {
                ...state,
                order: restDishes,
            };
        case SHOW_MODAL:
            return {
                ...state, showModal: action.payload
            };
        default:
            return state;
    }
};

export default ordersReducer;