import React from 'react'
import { FlatList, User, Border } from 'ui'
import data from 'fixtures/search'

const ITEM_HEIGHT = 70

const People = () => (
  <FlatList
    data={data.users}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <User data={item} />}
    ItemSeparatorComponent={() => <Border />}
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
)

export default People
