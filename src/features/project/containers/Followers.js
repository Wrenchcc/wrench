import React, { Component } from 'react'
import { InfiniteList, User, HeaderTitle } from 'ui'
import data from 'fixtures/search'

let scrollView = null

// TODO: Translate header
export default class Followers extends Component {
  static navigationOptions = {
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Followers</HeaderTitle>
    ),
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <User data={item} />

  render() {
    return (
      <InfiniteList
        scrollRef={ref => {
          scrollView = ref
        }}
        borderSeparator
        data={data.users}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
    )
  }
}
