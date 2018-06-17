import React, { Component } from 'react'
import { InfiniteList, User, HeaderTitle } from 'ui'
import data from 'fixtures/search'

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
    <InfiniteList
      scrollRef={ref => {
        scrollView = ref
      }}
      borderSeparator
      data={data.users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <User data={item} />}
    />
  )
}
