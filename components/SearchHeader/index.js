import React,{ useState } from 'react';
import { Button, Image, View, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';
import styles from './styles'

const SearchHeader = (props) => {

    const { setFilterData, launches_Info, setIsSearching } = props

    const [searchQuery, setSearchQuery] = useState('')
    // const [filterData, setFilterData] = useState([])

    const onChangeSearch = (text) => {
        // setSearchQuery(text);
        const formattedQuery = text.toLowerCase()
        const searchData = filter(launches_Info, results => {
            console.log(text)
            if (text) {
                setIsSearching(true)
            } else {
                setIsSearching(false)
            }
            return contains(results, formattedQuery)
        });
        setFilterData(searchData)
        setSearchQuery(text)
    }

    const contains = ( { name }, query) => {

        const index = name.indexOf('|')
        const presentName = name.substring(0,index-1)
        const searchName = presentName.toLowerCase()
      
        if (searchName.length >= 3 && searchName.includes(query)) {
          return true;
        }
      
        return false;
      };

    //   const goLaunchList = (props) => {
    //     return <LaunchList launches_Info={launches_Info} setLaunches_Info={setLaunches_Info} next={next} favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches} />
    //    // return <Launches launches_Info={launches_Info} setLaunches_Info={setLaunches_Info} next={next} favorite_lunches={favorite_lunches} setFavorite_lunches={setFavorite_lunches} />
    //  }

    return (
        <View style={styles.container}>
            <Searchbar placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {/* <Button onPress={goLaunchList}/> */}
            {/* <FlatList
            data={filterData}
            renderItem={({item}) => <LaunchItem launch={item} />}
            showsVerticalScrollIndicator={false}
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            snapToInterval={Dimensions.get('window').height}
            /> */}
        </View>
      
    )
}

export default SearchHeader