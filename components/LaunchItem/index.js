import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import styles from './styles'
import LikeButton from '../LikeButton'
import WikiPage from '../WikiPage'

const LaunchItem = (props) => {

    const { id, name, image, window_start, pad, status, rocket } = props.launch

    const url = pad.wiki_url ? pad.wiki_url :  `https://en.wikipedia.org/wiki/ ${rocket.configuration.family}`

    const [active, setActive] = useState(false);   
    // const [likeImage, setLikeImage] = useState(require('../LikeButton/like_empty.png'));

    const index = name.indexOf('|')
    const presentName = name.substring(0,index-1)    

    // useEffect(async () => {
    //   await AsyncStorage.getItem(id, (error, result) => {
    //     console.log(result)
    //     if(error) console.error('Something went wrong!');
    //     else if(result) {
    //       setActive(true)
    //       setLikeImage(require('../LikeButton/like_full.png'))
    //     }
    //   });
    // });
          if (active) {
              AsyncStorage.getItem(id, (error, result) => {
                if(error) console.error('Something went wrong!');
                else if(result === null) {
                  const launchFav = {
                      id: id,
                      name: presentName,
                      image: image,
                      date: window_start,
                      country: pad.location.country_code,
                      status: status.name,
                      url: url
                  } 
                  // https://reactnative.dev/docs/asyncstorage
                  const storeData = async () => {
                      try {
                          await AsyncStorage.setItem(id, JSON.stringify(launchFav))
                          const currentItem = await AsyncStorage.getItem(id)    
                          console.log("currentItem")
                          console.log(currentItem)
                      } catch (e) {
                          console.log('err')
                      }
                    }
                    storeData()
      
                }
              });
              } else {
                // https://reactnative.dev/docs/asyncstorage
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
    //         } 
    //     storeFavorite()
    // }, [active]);       
    
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
        <LikeButton active={active} setActive={setActive} /*likeImage={likeImage} setLikeImage={setLikeImage}*//>
      
      </View>
      
    )
}

export default LaunchItem