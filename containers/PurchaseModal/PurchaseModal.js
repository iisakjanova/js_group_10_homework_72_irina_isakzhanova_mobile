import React from 'react';
import {Text, View, Modal, StyleSheet, ActivityIndicator} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {useDispatch, useSelector} from "react-redux";

import {DELIVERY_PRICE} from "../../constants";
import {createOrder, initOrderData, removeDishFromCart, showModal} from "../../store/actions/ordersActions";

const PurchaseModal = (props) => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders.order);
    const loading = useSelector(state => state.orders.loading);
    const totalAmount = props.total + DELIVERY_PRICE;


    const handleRemoveDish = (id) => {
        dispatch(removeDishFromCart(id));
    };

    const handleCloseModal = () => {
        dispatch(showModal(false));
        dispatch(initOrderData());
    };

    const handlePurchase = async () => {
        await dispatch(createOrder());
        dispatch(showModal(false));
        dispatch(initOrderData());
    };

    return (
        <View style={styles.centeredView}>
            {loading
                ?
                <ActivityIndicator size="large"/>
                :
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.visible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Your order:</Text>
                            {Object.keys(order).length !== 0
                                ?
                                <>
                                    {Object.keys(order).map(key => (
                                        <View key={key} style={styles.item}>
                                            <Text style={styles.modalText}>
                                                {order[key].title} x {order[key].qty}
                                            </Text>
                                            <Text style={[styles.modalText, styles.price]}>
                                                {order[key].totalPrice} KGS
                                            </Text>
                                            <Pressable onPress={() => handleRemoveDish(key)}>
                                                <Text style={styles.buttonRemoveText}>X</Text>
                                            </Pressable>
                                        </View>
                                    ))}
                                    <View style={styles.item}>
                                        <Text style={styles.modalText}>Delivery:</Text>
                                        <Text style={[styles.modalText, styles.price]}>{DELIVERY_PRICE}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.modalText}>Total:</Text>
                                        <Text style={[styles.modalText, styles.price]}>{totalAmount}</Text>
                                    </View>
                                    <Pressable
                                        style={[styles.button, styles.buttonOrder]}
                                        onPress={() => handlePurchase()}
                                    >
                                        <Text style={styles.textStyle}>Order</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => handleCloseModal()}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </>
                                :
                                <>
                                    <View style={styles.item}>
                                        <Text style={styles.noItemsTitle}>Nothing yet</Text>
                                    </View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => handleCloseModal()}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </>
                            }
                        </View>
                    </View>
                </Modal>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "100%"
    },
    item: {
        // flex: 1,
        flexDirection: "row",
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    price: {
        marginLeft: "auto",
        paddingRight: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        alignSelf: "stretch",
    },
    buttonRemoveText: {
        color: "red",
    },
    buttonClose: {
        backgroundColor: "grey",
    },
    buttonOrder: {
        backgroundColor: "#2196F3",
        marginTop: "auto",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    noItemsTitle: {
        width: "100%",
    },
});


export default PurchaseModal;