import React, { Component } from 'react'
import { FlatList, Notification, Border } from 'ui'
import data from 'fixtures/notifications'
import { Header } from './styles'

let scrollView = null

export default class Notifications extends Component {
  static navigationOptions = () => ({
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.isFocused()) {
        scrollView.scrollToOffset({ offset: 0 })
      } else {
        defaultHandler()
      }
    },
  })

  componentWillUnmont() {
    scrollView = null
  }

  render = () => (
    <FlatList
      defaultPaddingTop
      scrollRef={ref => {
        scrollView = ref
      }}
      ListHeaderComponent={<Header medium>Notifications</Header>}
      ItemSeparatorComponent={() => <Border />}
      initialNumToRender={10}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Notification data={item} />}
    />
  )
}
