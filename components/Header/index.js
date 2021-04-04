import React from 'react'
import { Image, View } from 'react-native'
import styles from './styles'

const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.menu} source={require('../../assets/images/menu.png')} />
            {/* <Image style={styles.logo} source={require('../../assets/images/logo.png')} /> */}
        </View>
      
    )
}

export default Header