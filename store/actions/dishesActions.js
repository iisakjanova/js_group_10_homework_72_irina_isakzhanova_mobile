import axiosApi from "../../axiosApi";

export const GET_DISHES_REQUEST = 'GET_DISHES_REQUEST';
export const GET_DISHES_SUCCESS = 'GET_DISHES_SUCCESS';
export const GET_DISHES_FAILURE = 'GET_DISHES_FAILURE';

export const getDishesRequest = () => ({type: GET_DISHES_REQUEST});
export const getDishesSuccess = dishes => ({type: GET_DISHES_SUCCESS, payload: dishes});
export const getDishesFailure = error => ({type: GET_DISHES_FAILURE, payload: error});

export const getDishes = () => {
    return async dispatch => {
        try {
            dispatch(getDishesRequest());
            const response = await axiosApi.get('/dishes.json');
            dispatch(getDishesSuccess(response.data));
        } catch (error) {
            dispatch(getDishesFailure(error));
        }
    };
};