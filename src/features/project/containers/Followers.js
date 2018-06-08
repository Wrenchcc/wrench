import React, { Component } from 'react'
import { FlatList, User, HeaderTitle } from 'ui'
import data from 'fixtures/search'

// TODO: Handle scroll to better
let scrollView = null

export default class Followers extends Component {
  static navigationOptions = () => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Followers</HeaderTitle>
    ),
  })

  componentWillUnmont() {
    scrollView = null
  }

  render = () => (
    <FlatList
      scrollRef={ref => {
        scrollView = ref
      }}
      data={data.users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <User data={item} />}
    />
  )
}
