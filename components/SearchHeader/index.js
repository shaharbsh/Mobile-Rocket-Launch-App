import React,{ useState } from 'react';
import { View } from 'react-native'
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';
import styles from './styles'

const SearchHeader = (props) => {

    const { setFilterData, launches_Info, setIsSearching, searchQuery, setSearchQuery } = props

    const onChangeSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const searchData = filter(launches_Info, results => {
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
      
        if (/*query.length >= 3 &&*/ searchName.includes(query)) {
          return true;
        }
      
        return false;
    };

    return (
        <View style={styles.container}>
            <Searchbar placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>
    )
}

export default SearchHeader