import { Image, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React from 'react';
import AppText from "./AppText";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Listitem = ({ title, subTitle, image, ImageComponent, onPress }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginVertical: 0,
            backgroundColor: '#fff',
            alignItems: 'center',
            marginHorizontal: 30,
            borderRadius: 10
        },
        image: {
            width: 80,
            height: 80,
            borderRadius: 50,
            marginLeft: 10,
            marginVertical: 10
        },
        ownerHolder: {
            flex: 1,
            marginTop: 10,
            marginHorizontal: 15,
            justifyContent: "center"
        },
        name: {
            fontWeight: "bold"
        },
        Listing: {
            color: 'red',
            marginTop: 5
        }
    });

    return (
        <TouchableWithoutFeedback
            underlayColor="#333"
            onPress={onPress}
        >
            <View style={styles.container}>
                {ImageComponent}
                {Image && <Image source={{ uri: image }} style={styles.image} />}

                <View style={styles.ownerHolder}>
                    <AppText inputText={title} stylesLing={styles.name} numberOfLines={1} />
                    {subTitle && <AppText inputText={subTitle} stylesLing={styles.Listing} numberOfLines={2} />}
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color='#000' />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Listitem;
