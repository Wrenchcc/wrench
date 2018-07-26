import React, { Component } from 'react'
import { Post, InfiniteList } from 'ui'
import Popular from 'features/explore/components/Popular'
import posts from 'fixtures/posts'

let scrollView = null

export default class Explore extends Component {
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

  render = () => (
    <InfiniteList
      scrollRef={ref => {
        scrollView = ref
      }}
      ListHeaderComponent={<Popular />}
      withKeyboardHandler
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Post data={item} />}
    />
  )
}
