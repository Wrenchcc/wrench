import React from 'react'
import { filter } from 'ramda'
import { FlatList, User2, Border } from 'ui'
import users from 'fixtures/users'

const ITEM_HEIGHT = 70

// TODO: Fix generic user component
const Mention = ({ onPress, query }) => (
  <FlatList
    defaultPadding
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="none"
    data={filter(a => a.fullName.toLowerCase().includes(query), users)}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Border />}
    renderItem={({ item }) => <User2 user={item} onPress={onPress} />}
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
)

export default Mention
