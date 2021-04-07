import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Dimensions } from 'react-native'
import styles from './styles'
import LaunchItem from '../LaunchItem'
import SearchHeader from '../SearchHeader'

const LaunchList = (props) => {

    let { launches_Info, setLaunches_Info, next } = props
    
    useEffect(() => {
        console.log('here')
        
    },launches_Info);   

    const [loadingMore, setLoadingMore] = useState(false)
    const [allLoaded, setAllLoaded] = useState(false)
    const [next10, setNext10] = useState(next)
    const [filterData, setFilterData] = useState(launches_Info)
    const [isSearching, setIsSearching] = useState(false)

    const loadMoreResults = async () => {

        if (loadingMore || allLoaded || isSearching)
            return

        setLoadingMore(true)
        
        // const customData = require("../LaunchList/fake2.json")

        const response = await fetch(next10)
        const customData = await response.json()
        
        setNext10(customData.next)
        if (next === null) {
            setAllLoaded(true)
        }
        for (let launch of customData.results){
            launches_Info.push(launch)
        }

        setLoadingMore(false)
        setLaunches_Info(launches_Info)
        setFilterData(launches_Info)
    }
   
    return (
        <View style={styles.container}>
            <SearchHeader setFilterData={setFilterData} launches_Info={launches_Info} setIsSearching={setIsSearching} />
            <FlatList
            data={filterData}
            renderItem={({item}) => <LaunchItem launch={item} />}
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
            // from stackoverflow
            initialNumToRender={10}   // how many item to display first
            onEndReachedThreshold={0.01} 
            onEndReached={() => { loadMoreResults() }}
            />
            
        </View>
    )
}


export default LaunchList