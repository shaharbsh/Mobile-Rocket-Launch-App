import 'react-native-gesture-handler';
import React,{ useState, setState, component, useRef } from 'react';
import { NavigationContainer, useFocusEffect, useIsFocused  } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; //can change to bottom-tabs
import { WebView } from 'react-native-webview';
// import { createStore } from 'redux';
// import reducer from './reducers';
// import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import LaunchList from './components/LaunchList'
import FavoritesList from './components/FavoritesList'


const Tab = createMaterialBottomTabNavigator();//createMaterialTopTabNavigator();



export default function App() {

  // initialization of the first 10 launchs:
  let currentPage = "https://ll.thespacedevs.com/2.0.0/launch/previous/"
  
  const [next, setNext] = useState()
  const [launches_Info, setLaunches_Info] = useState([]);
  React.useEffect(() => {
    const fetchLaunchs = async () => {
      // const customData = require('./components/LaunchList/fakeRes.json')
      const response = await fetch(currentPage)
      const data = await response.json()
      setLaunches_Info(data.results)
      setNext(data.next)
      console.log(data)
    }
    fetchLaunchs()
  }, [])

  console.log('hi')
  console.log(launches_Info)
  let [favorite_lunches, setFavorite_lunches] = useState([])  
  // console.log('look here')

  const goLaunchList = (props) => {
     return <LaunchList launches_Info={launches_Info} setLaunches_Info={setLaunches_Info} next={next} favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches} />
  }

  
  const goFavoriteList = (props) => {
    return <FavoritesList favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches}/>
 }

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator 
        initialRouteName = "Launches List"
        activeColor="#003366"
        inactiveColor="#cccccc"//"#f0edf6"
        barStyle = {styles.tabNav}
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
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderTopColor: '#003366',
    borderTopWidth: 2,
  }
});

