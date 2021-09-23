import React, {useEffect} from 'react';
import {StyleSheet, Text, Button, ScrollView, SafeAreaView, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {StatusBar} from "expo-status-bar";

import {getDishes} from "../../store/actions/dishesActions";
import Dish from "../../components/Dish/Dish";
import {addDishToCart, showModal} from "../../store/actions/ordersActions";
import PurchaseModal from "../../components/Modal/PurchaseModal";

const Dishes = () => {
    const dispatch = useDispatch();
    const dishes = useSelector(state => state.dishes.dishes);
    const loading = useSelector(state => state.dishes.loading);
    const order = useSelector(state => state.orders.order);
    const showPurchaseModal = useSelector(state => state.orders.showModal);

    useEffect(() => {
        (async () => {
            await dispatch(getDishes());
        })();
    }, [dispatch]);

    const handleAddDishToCart = (dish) => {
        dispatch(addDishToCart(dish));
    };

    const calculateTotal = order => {
        return Object.values(order).reduce((acc, dish) => {
            return acc + dish.totalPrice;
        }, 0);
    };

    const total = calculateTotal(order);

    const handlePurchasing = () => {
        dispatch(showModal(true));
    };

    const purchaseCancelHandler = () => {
        dispatch(showModal(false));
    };

    return (
        <SafeAreaView style={styles.container}>
            <PurchaseModal
                visible={showPurchaseModal}
                invisible={purchaseCancelHandler}
                orderData={order}
            />
            {loading
                ?
                <ActivityIndicator size="large" />
                :
                <ScrollView style={styles.view}>
                    {Object.keys(dishes).map(key => {
                        const title = dishes[key].title;
                        const price = Number(dishes[key].price);

                        return (
                            <Dish
                                key={key}
                                image={dishes[key].image}
                                title={title}
                                price={price}
                                onAdd={() => handleAddDishToCart({title, price, id: key})}
                            />
                        );
                    })}
                </ScrollView>
            }
            <StatusBar style="auto"/>
            <Text style={styles.total}>Order total {total} KGS</Text>
            <Button
                style={styles.container}
                title="Checkout"
                color="#f194ff"
                onPress={handlePurchasing}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        padding: 20,
    },
    view: {
        flexGrow: 1,
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    btn: {
        width: 50,
    },
    total: {
        padding: 10,
        textAlign: 'center',
        marginTop: 'auto',
    },
});

export default Dishes;