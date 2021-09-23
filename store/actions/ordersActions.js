export const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
export const SHOW_MODAL = 'SHOW_MODAL';
export const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';

export const addDishToCart = dish => ({
    type: ADD_DISH_TO_CART,
    payload: {title: dish.title, price: dish.price, id: dish.id}
});

export const showModal = isOpen => ({type: SHOW_MODAL, payload: isOpen});
export const removeDishFromCart = id => ({type: REMOVE_DISH_FROM_CART, payload: id});