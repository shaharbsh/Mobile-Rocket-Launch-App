import 'react-native-gesture-handler'
import React,{ useState, useEffect } from 'react'
import { NavigationContainer, useIsFocused  } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import AsyncStorage from '@react-native-community/async-storage'

import { Text, StyleSheet, View } from 'react-native'
import LaunchList from './components/LaunchList'
import FavoritesList from './components/FavoritesList'


const Tab = createMaterialBottomTabNavigator();

export default function App() {

  // AsyncStorage.clear() // for testing
  
  // initialization of the first 10 launchs:
  let currentPage = "https://ll.thespacedevs.com/2.0.0/launch/previous/" 
  
  const [next, setNext] = useState()
  const [launches_Info, setLaunches_Info] = useState([]); //the array that will contain all the launches that loaded
  useEffect(() => { 
    const fetchLaunchs = async () => {
      // const data = require('./components/LaunchList/fakeRes.json') //for testing
      const response = await fetch(currentPage)
      const data = await response.json()
      setLaunches_Info(data.results)
      setNext(data.next)
    }
    fetchLaunchs()
  }, [])
  
  console.log('hi')

  const goLaunchList = (props) => {
     return <LaunchList launches_Info={launches_Info} setLaunches_Info={setLaunches_Info} next={next} />
  }

  
  const goFavoriteList = (props) => {
    return <FavoritesList />
 }

  return (
    // https://reactnavigation.org/docs/tab-based-navigation/
    <NavigationContainer style={styles.container}> 
      <Tab.Navigator 
        initialRouteName = "Launches List"
        activeColor="#003366"
        inactiveColor="#cccccc"
        barStyle = {styles.tabNav} >
        <Tab.Screen name="Launches List" component={goLaunchList} />
        <Tab.Screen name="Favorites" component={goFavoriteList} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNav: {
    backgroundColor: 'white',
    borderTopColor: '#003366',
    borderTopWidth: 2,
  }
});

