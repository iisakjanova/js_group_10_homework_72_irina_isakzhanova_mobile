import React, {useEffect} from 'react';
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {getDishes} from "../../store/actions/dishesActions";
import Dish from "../../components/Dish/Dish";

const Dishes = () => {
    const dispatch = useDispatch();
    const dishes = useSelector(state => state.dishes.dishes);
    const loading = useSelector(state => state.dishes.loading);

    useEffect(() => {
        (async () => {
            await dispatch(getDishes());
        })();
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {Object.keys(dishes).map(key => (
                <Dish
                    key={key}
                    image={dishes[key].image}
                    title={dishes[key].title}
                    price={dishes[key].price}
                />
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        flexDirection: "column",
        width: '100%',
    },
});

export default Dishes;