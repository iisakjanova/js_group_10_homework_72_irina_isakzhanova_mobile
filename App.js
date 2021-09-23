import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import Dishes from "./containers/Dishes/Dishes";
import dishesReducer from "./store/redusers/dishesReducer";
import ordersReducer from "./store/redusers/ordersReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    dishes: dishesReducer,
    orders: ordersReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default () => {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Text>Turtle Pizza</Text>
                    <Dishes />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50
    },
});
