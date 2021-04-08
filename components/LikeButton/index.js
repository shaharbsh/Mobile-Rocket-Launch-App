import React from 'react'
import { View, Pressable, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'

const LikeButton = (props) => {

    const { active, setActive, id, likeImage, setLikeImage } = props   

    // when pressing on the icon like - change the icon accordingly
    const liked = () => {
        let icon = !active
        setActive(icon)
        if (active) { // if the like_full icon was pressed we need to remove the item from storage
            setLikeImage(require('./like_empty.png'))
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

        } else {
            setLikeImage(require('./like_full.png'))
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={likeImage => liked(likeImage)}>
                <Image style={styles.image} source={likeImage}/>
            </Pressable>
        </View>
    )
}

export default LikeButton
