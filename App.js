import 'react-native-gesture-handler';
import React,{ useState, useEffect } from 'react';
import { NavigationContainer, useIsFocused  } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import SearchHeader from './components/SearchHeader'
import LaunchList from './components/LaunchList'
import FavoritesList from './components/FavoritesList'
import Launches from './components/Launches'


const Tab = createMaterialBottomTabNavigator();



export default function App() {

  AsyncStorage.clear(); // for testing
  // initialization of the first 10 launchs:
  let currentPage = "https://ll.thespacedevs.com/2.0.0/launch/previous/"
  
  const [next, setNext] = useState()
  const [launches_Info, setLaunches_Info] = useState([]);
  useEffect(() => {
    const fetchLaunchs = async () => {
      // const data = require('./components/LaunchList/fakeRes.json')
      const response = await fetch(currentPage)
      const data = await response.json()
      setLaunches_Info(data.results)
      setNext(data.next)
      // console.log(data)
    }
    fetchLaunchs()
  }, [])

  console.log('hi')
  // console.log(launches_Info)
  let [favorite_lunches, setFavorite_lunches] = useState([])  
  // console.log('look here')

  const goLaunchList = (props) => {
     return <LaunchList launches_Info={launches_Info} setLaunches_Info={setLaunches_Info} next={next} />
  }

  
  const goFavoriteList = (props) => {
    return <FavoritesList favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches}/>
 }

  return (
    // https://reactnavigation.org/docs/tab-based-navigation/
    <NavigationContainer style={styles.container}>
      <Tab.Navigator 
        initialRouteName = "Launches List"
        activeColor="#003366"
        inactiveColor="#cccccc"//"#f0edf6"
        barStyle = {styles.tabNav}
        // navigationOptions = {
        //   header: <SearchHeader />
        // }
        >
        <Tab.Screen name="Launches List" component={goLaunchList} />
        <Tab.Screen name="Favorites" component={goFavoriteList} />
      </Tab.Navigator>
    </NavigationContainer>
    
    // <View style={styles.container}>
    //   <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
    //   <Header />
    //   <LaunchList launches_Info={launches_Info} next={next} favorite_lunches={favorite_lunches} />
    //   <StatusBar style="auto" />
    // </View>
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
    backgroundColor: 'white',//'rgba(255,255,255,1)',
    borderTopColor: '#003366',
    borderTopWidth: 2,
  }
});

