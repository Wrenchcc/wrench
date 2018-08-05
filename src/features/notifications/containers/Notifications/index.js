import React, { Component } from 'react'
import { InfiniteList, Notification } from 'ui'
import data from 'fixtures/notifications'
import { Header } from './styles'

const ITEM_HEIGHT = 70
let scrollView = null

// TODO: Translate
export default class Notifications extends Component {
  static navigationOptions = {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.isFocused()) {
        scrollView.scrollToOffset({ offset: 0 })
      } else {
        defaultHandler()
      }
    },
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Notification data={item} />

  render = () => (
    <InfiniteList
      defaultPaddingTop
      scrollRef={ref => {
        scrollView = ref
      }}
      ListHeaderComponent={<Header medium>Notifications</Header>}
      borderSeparator
      initialNumToRender={10}
      data={data}
      keyExtractor={item => item.id}
      renderItem={this.renderItem}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  )
}
