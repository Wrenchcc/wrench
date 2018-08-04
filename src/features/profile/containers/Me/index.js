import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { graphql } from 'react-apollo'
import getCurrentUser from 'graphql/queries/getCurrentUser.graphql'
import { InfiniteList, Post, HeaderTitle, EmptyState } from 'ui'
import Header from 'features/profile/components/Header'
import data from 'fixtures/profile'

const HEADER_HEIGHT = 100
const START_OPACITY = 50

let scrollView = null

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      headerTitle: params.user && (
        <HeaderTitle
          opacity={params.opacity || new Animated.Value(0)}
          onPress={() => scrollView.scrollToOffset({ offset: 0 })}
        >
          {params.user.fullName}
        </HeaderTitle>
      ),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.isFocused()) {
          scrollView.scrollToOffset({ offset: 0 })
        } else {
          defaultHandler()
        }
      },
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)

    props.navigation.setParams({
      user: props.data.currentUser,
      opacity: this.scrollY.interpolate({
        inputRange: [START_OPACITY, HEADER_HEIGHT + START_OPACITY],
        outputRange: [0, 1],
      }),
    })
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post data={item} avatar={false} />

  render() {
    const emptyState = 'project'
    const hasPosts = data.posts.length > 0
    const { currentUser } = this.props.data

    return (
      <InfiniteList
        scrollEnabled={hasPosts}
        scrollRef={ref => {
          scrollView = ref
        }}
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListHeaderComponent={<Header user={currentUser} spacingHorizontal={!hasPosts} />}
        ListEmptyComponent={<EmptyState type={emptyState} />}
        withKeyboardHandler
        data={data.posts}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
          useNativeDriver: true,
        })}
      />
    )
  }
}

export default graphql(getCurrentUser)(Profile)
