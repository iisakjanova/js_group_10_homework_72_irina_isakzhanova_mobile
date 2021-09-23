import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

const Dish = (props) => {
    const image = props.image;

    return (
        <TouchableOpacity style={styles.item} onPress={props.onAdd}>
            <Image source={{uri: image}} style={styles.img}/>
            <Text style={styles.title}>{props.title}</Text>
            <Text>{props.price}KGS</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
    },
    title: {
        height: 80,
    },
    img: {
        width: 100,
    },
});

export default Dish;