import React, { useState, useEffect } from 'react'
import { View, Pressable, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'

const LikeButton = (props) => {

    const { active, setActive, id, likeImage, setLikeImage, setIsPress } = props   
    
    // const [active, setActive] = useState(false);
    // const [likeImage, setLikeImage] = useState(require('./like_empty.png'))

    const liked = () => {
        let icon = !active
        setActive(icon)
        setIsPress(true)
        if (active) {
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
            // AsyncStorage.getItem(id, (error, result) => {
            //     console.log("result")
            //     if(error) console.error('Something went wrong!');
            //     else if(result) {
            //         let value = JSON.parse(result)
            //       if (value.like) {
            //         let changeLike = {
            //             like: false
            //         };
            //         AsyncStorage.setItem(id, result, () => {
            //             AsyncStorage.mergeItem(id,JSON.stringify(changeLike))//, () => { 
            //                 // AsyncStorage.getItem(id, (err, result) => {
            //                 // console.log(result);
            //                 // });
            //             // });
            //         });
            //       }
            //     }
            // })

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
