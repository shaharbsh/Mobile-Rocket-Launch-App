import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Image } from 'react-native'
import styles from './styles'

const LikeButton = (props) => {

    const { active, setActive, likeImage, setLikeImage } = props
    

    // const [active, setActive] = useState(false);
    // const [likeImage, setLikeImage] = useState(require('./like_empty.png'));

    const liked = () => {
        let icon = !active
        setActive(icon)
        if (active) {
            setLikeImage(require('./like_empty.png'))
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
