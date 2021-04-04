import React, { Component, useState, useEffect } from 'react'
import { Text, View, ImageBackground, Linking } from 'react-native'
import styles from './styles'
import LikeButton from '../LikeButton'

const FavoriteItem = (props) => {

    const { name, image, date, country, status, url } = props.launch
    
    return (
        <View style={styles.launchContainer}>
          <Text>favorite_lunches</Text>
        <ImageBackground source={{uri: image}}
        style={styles.image} />
        <View style={styles.titles}>
            <Text style={styles.name} onPress={() => Linking.openURL(url)}>{name}</Text>
            <Text style={styles.data} onPress={() => Linking.openURL(url)}>
              launch date: {date} {'\n'}
              country: {country} {'\n'}
              status: {status}
            </Text>                 
        </View>
      
      </View>
      
    )
}

export default FavoriteItem