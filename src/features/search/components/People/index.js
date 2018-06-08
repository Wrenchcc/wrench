import React from 'react'
import { FlatList, User } from 'ui'
import data from 'fixtures/search'

const People = () => (
  <FlatList
    data={data.users}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <User data={item} />}
  />
)

export default People
