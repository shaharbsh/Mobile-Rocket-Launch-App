import React, { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
// import { useDispatch } from 'react-redux'
import styles from './styles'
import LaunchList from '../LaunchList'

const LoadMoreButton = (props) => {

    let { launches_Info, setLaunches_Info, next } = props

    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [next10, setNext10] = useState(next);
    // const [lounchesList, setLounchesList] = useState(launches_Info);

    const loadMoreResults = async () => {

        if (loadingMore || allLoaded)
            return

        setLoadingMore(true)
        
        const customData = require("../LaunchList/fake2.json")

        // const response = await fetch(next10);
        // const customData = await response.json();
        // console.log('im good');
        
        setNext10(customData.next)
        // console.log(next10)
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
            <Pressable
            style={styles.button}
            onPress={info => loadMoreResults(info)}>
                <Text style={styles.text}>Load More</Text>
            </Pressable>
        </View>
    )
}

export default LoadMoreButton
