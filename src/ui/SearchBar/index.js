import React from 'react'
import { View } from 'react-native'
import { navigateToSearch } from 'navigation'
import { Search, Add } from 'ui'

const SearchBar = () => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <Search onPress={() => navigateToSearch()} style={{ flex: 1, paddingRight: 20 }} />
    <Add style={{ width: 20 }} />
  </View>
)

export default SearchBar
