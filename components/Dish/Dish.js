import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const Dish = (props) => {
    const image = props.image;
    return (
        <View style={styles.item}>
            <Image source={{uri: image}} style={styles.img}/>
            <Text>{props.title}</Text>
            <Text>{props.price} KGS</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 0.1,
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
    },
    img: {
        width: 100,
        height: 'auto',
    }
});

export default Dish;