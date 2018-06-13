import React, { Component } from 'react'
import { Post, InfiniteList } from 'ui'
import posts from 'fixtures/posts'
import { INITIAL_POSTS_COUNT } from '../constants'

let scrollView = null

export default class Feed extends Component {
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
    <InfiniteList
      scrollRef={ref => {
        scrollView = ref
      }}
      withKeyboardHandler
      defaultPaddingTop
      initialNumToRender={INITIAL_POSTS_COUNT}
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Post data={item} />}
    />
  )
}
