import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import styles from './styles'

const WikiPage = (props) => {

    const { url } = props 
    console.log(url)

    return (
        <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
    )
}

export default WikiPage
