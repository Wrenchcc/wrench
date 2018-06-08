import React from 'react'
import { View } from 'react-native'
import { filter } from 'ramda'
import { FlatList, User2 } from 'ui'

import users from 'fixtures/users'

const Mention = ({ onPress, query }) => (
  <FlatList
    defaultPadding
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="none"
    data={filter(a => a.fullName.toLowerCase().includes(query), users)}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View>
        <User2 user={item} onPress={onPress} />
      </View>
    )}
  />
)

export default Mention
