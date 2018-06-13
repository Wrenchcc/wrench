import React from 'react'
import { InfiniteList, User } from 'ui'
import data from 'fixtures/search'

const ITEM_HEIGHT = 70

const People = () => (
  <InfiniteList
    data={data.users}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <User data={item} />}
    borderSeparator
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
)

export default People
