// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native'
import styles from './styles'
import LaunchItem from '../LaunchItem'
import LoadMoreButton from '../LoadMoreButton'

const LaunchList = (props) => {

    let { launches_Info, setLaunches_Info, next, favorite_lunches, setFavorite_lunches } = props
    

    useEffect(() => {
        console.log('here')
        
    },launches_Info);   

    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [next10, setNext10] = useState(next);

    const loadMoreResults = async () => {

        if (loadingMore || allLoaded)
            return

        setLoadingMore(true)
        
        // const customData = require("../LaunchList/fake2.json")

        console.log(next10)
        const response = await fetch(next10);
        const customData = await response.json();
        
        setNext10(customData.next)
        if (next === null) {
            setAllLoaded(true)
        }
        for (let launch of customData.results){
            launches_Info.push(launch)
        }

        setLoadingMore(false)
        setLaunches_Info(launches_Info)

        // return <LaunchList launches_Info={launches_Info} next={next10} />
    }
   

    return (
        <View style={styles.container}>
            <FlatList
            data={launches_Info}
            renderItem={({item}) => <LaunchItem launch={item} favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches} />}
            showsVerticalScrollIndicator={false}
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            snapToInterval={Dimensions.get('window').height}
            ListFooterComponent={           
                <View style={styles.footer}>
                  {loadingMore && (next ? <Text style={styles.footerText}>Loading More...</Text>
                  : <Text style={styles.footerText}>No More Launches</Text>)
                  }
                </View>
              }
            initialNumToRender={10}   // how many item to display first
            onEndReachedThreshold={0.01} // so when you are at 5 pixel from the bottom react run onEndReached function
            onEndReached={() => { loadMoreResults() }}
            />
            
        </View>
      
    )
}



export default LaunchList