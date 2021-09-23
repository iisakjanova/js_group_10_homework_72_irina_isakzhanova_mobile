export const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';

export const addDishToCart = dish => ({
    type: ADD_DISH_TO_CART,
    payload: {title: dish.title, price: dish.price, id: dish.id}
});
