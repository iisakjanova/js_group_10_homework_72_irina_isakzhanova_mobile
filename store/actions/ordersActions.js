import axiosApi from "../../axiosApi";

export const INIT_ORDER_DATA = 'INIT_ORDER_DATA';

export const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
export const SHOW_MODAL = 'SHOW_MODAL';
export const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';

export const SUBMIT_ORDER_REQUEST = 'SUBMIT_ORDER_REQUEST';
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILURE = 'SUBMIT_ORDER_FAILURE';

export const initOrderData = () => ({type: INIT_ORDER_DATA});

export const addDishToCart = dish => ({
    type: ADD_DISH_TO_CART,
    payload: {title: dish.title, price: dish.price, id: dish.id}
});

export const showModal = isOpen => ({type: SHOW_MODAL, payload: isOpen});
export const removeDishFromCart = id => ({type: REMOVE_DISH_FROM_CART, payload: id});

export const submitOrderRequest = () => ({type: SUBMIT_ORDER_REQUEST});
export const submitOrderSuccess = () => ({type: SUBMIT_ORDER_SUCCESS});
export const submitOrderFailure = error => ({type: SUBMIT_ORDER_FAILURE, payload: error});

export const createOrder = () => {
    return async (dispatch, getState) => {
        const dishesToOrder = getState().orders.order;
        let order = {};

        Object.keys(dishesToOrder).forEach((key) => {
            order[key] = dishesToOrder[key].qty;
        });

        try {
            dispatch(submitOrderRequest());
            await axiosApi.post('/orders.json', order);
            dispatch(submitOrderSuccess());
        } catch (error) {
            dispatch(submitOrderFailure(error));
        }
    };
};