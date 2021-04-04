import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native'
import styles from './styles'
import FavoriteItem from '../FavoriteItem'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const FavoritesList = (props) => {

    const isFocused = useIsFocused()
    let [ favorite_lunches, setFavorite_lunches ] = useState([])
  

    useEffect(() => {
        
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                let fav = []
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    let jsonValue = value != null ? JSON.parse(value) : null
                    fav.push(jsonValue)
                });
                setFavorite_lunches(fav)
                console.log(favorite_lunches)
            });
        });
        // console.log(fav)
        
    },[isFocused]);   

    // console.log(fav)    

    return (
        <View style={styles.container}>
            <FlatList
            data={favorite_lunches}
            renderItem={({item}) => <FavoriteItem launch={item} />}
            showsVerticalScrollIndicator={false}
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            snapToInterval={Dimensions.get('window').height}
            />
        </View>
      
    )
}



export default FavoritesList