import React, { Component, useState, useEffect } from 'react'
import { Text, View, ImageBackground, Linking, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import styles from './styles'
import LikeButton from '../LikeButton'
import WikiPage from '../WikiPage'

const LaunchItem = (props) => {

    const { id, name, image, window_start, pad, status, rocket } = props.launch
    let { favorite_lunches, setFavorite_lunches } = props

    const url = pad.wiki_url ? pad.wiki_url :  `https://en.wikipedia.org/wiki/ ${rocket.configuration.family}`

    const [active, setActive] = useState(false);   

    const index = name.indexOf('|')
    const presentName = name.substring(0,index-1)

    // console.log('props.launch')
    // console.log(favorite_lunches)
    
    
    if (active) {
        // console.log(active)
        const launchFav = {
            id: id,
            name: presentName,
            image: image,
            date: window_start,
            country: pad.location.country_code,
            status: status.name,
            url: url
        } 
        
        const storeData = async () => {
            try {
                await AsyncStorage.setItem(id, JSON.stringify(launchFav))
                const currentItem = await AsyncStorage.getItem(id)    
                // console.log(currentItem)
            } catch (e) {
                console.log('err')
            }
          }
    
          
          storeData()
        } else {
            const removeValue = async () => {
              try {
                await AsyncStorage.removeItem(id)
              } catch(e) {
                console.log('err')
              }
            
              console.log('Done.')
            }
            removeValue()
        }
        // favorite_lunches.push(props.launch)
        // setFavorite_lunches(favorite_lunches)
        // console.log(favorite_lunches)
        

    // } else {
    //     var array = favorite_lunches; // make a separate copy of the array
    //     var index; //= array.indexOf(id)
    //     for (let [i, item] of array.entries()) {
    //         if (item.id === id) {
    //             index = i
    //             break
    //         }
    //         else if (i === array.length) {
    //             index = -1
    //         }
    //     }
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         setFavorite_lunches(array)
    //     }
    // }

    
    
    return (
        <View style={styles.launchContainer}>
        <ImageBackground source={{uri: image}}
        style={styles.image} />
        <View style={styles.titles}>
        {/* <Text style={styles.name}>{name}</Text> */}
        {/* <Button title="Go To Wiki" onPress={() => {<WikiPage url={pad.wiki_url}/>}}/> */}
        {/* <WikiPage url={pad.wiki_url}/> */}
            <Text style={styles.name} onPress={() => Linking.openURL(url)}>{presentName}</Text>
            <Text style={styles.data} onPress={() => Linking.openURL(url)}>
              launch date: {window_start} {'\n'}
              country: {pad.location.country_code} {'\n'}
              status: {status.name}
            </Text>                 
        </View>
        <LikeButton active={active} setActive={setActive}/>
      
      </View>
      
    )
}

export default LaunchItem