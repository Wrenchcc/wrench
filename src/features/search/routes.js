import React from 'react'
import { View } from 'react-native'
import { Search, Text } from 'ui'
import { navigateToSearch, navigateBack } from 'navigation'
import wwff from './containers/Search'
import { ROUTE_NAMES } from './constants'

// TODO: fix generic component for search
export default {
  [ROUTE_NAMES.SEARCH]: {
    component: wwff,
    navigationOptions: {
      headerLeft: null,
      headerTitle: () => (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Search
            onPress={() => navigateToSearch()}
            placeholder={false}
            style={{ flex: 1, paddingRight: 20 }}
          />
          <Text onPress={() => navigateBack()} medium>
            Cancel
          </Text>
        </View>
      ),
    },
  },
}
