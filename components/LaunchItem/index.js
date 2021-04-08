import React, { useState } from 'react'
import { Text, View, ImageBackground, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import LikeButton from '../LikeButton'

const LaunchItem = (props) => {

    const { id, name, image, window_start, pad, status, rocket } = props.launch

    const url = pad.wiki_url ? pad.wiki_url :  `https://en.wikipedia.org/wiki/ ${rocket.configuration.family}` // if there is not url then send to the rocket url

    const [active, setActive] = useState(false);   // if favorite button pressed
    const [likeImage, setLikeImage] = useState(require('../LikeButton/like_empty.png'));

    const index = name.indexOf('|')
    const presentName = name.substring(0,index-1) // the name without the part after | (this is what I understend for the name)    

      if (active) { // if the like button was pressed, add the item to the favorite storage
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
                  url: url,
                  like: true
              } 
              // https://reactnative.dev/docs/asyncstorage
              const storeData = async () => {
                  try {
                      await AsyncStorage.setItem(id, JSON.stringify(launchFav))
                  } catch (e) {
                      console.log('err')
                  }
                }
                storeData()
  
            }
          });
          } 
          else { // if the item in the favorite storage from previus visit of the item than show like_full icon
              AsyncStorage.getItem(id, (error, result) => {
                if(error) console.error('Something went wrong!');
                else if(result) {
                  let value = JSON.parse(result)
                  if (value.like) { 
                    setActive(true)
                    setLikeImage(require('../LikeButton/like_full.png'))
                  }
              }
            });
          }
   
    
    return (
        <View style={styles.launchContainer}>
        <ImageBackground source={{uri: image}} style={styles.image} />
        <View style={styles.titles}>
            <Text style={styles.name} onPress={() => Linking.openURL(url)}>{presentName}</Text>
            <Text style={styles.data} onPress={() => Linking.openURL(url)}>
              launch date: {window_start} {'\n'}
              country: {pad.location.country_code} {'\n'}
              status: {status.name}
            </Text>                 
        </View>
        <LikeButton active={active} setActive={setActive} id={id} likeImage={likeImage} setLikeImage={setLikeImage} />      
      </View>
      
    )
}
export default LaunchItem

