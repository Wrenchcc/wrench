import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { compose } from 'react-apollo'
import { getCurrentUserProfile } from 'graphql/queries/user/getCurrentUser'
import { InfiniteListWithHandler, Post, HeaderTitle, EmptyState } from 'ui'
import Header from 'features/profile/components/Header'

const HEADER_HEIGHT = 100
const START_OPACITY = 50

let scrollView = null

class Me extends PureComponent {
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
    user: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)

    props.navigation.setParams({
      opacity: this.scrollY.interpolate({
        inputRange: [START_OPACITY, HEADER_HEIGHT + START_OPACITY],
        outputRange: [0, 1],
      }),
    })
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post post={item.node} avatar={false} />

  render() {
    const { posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    const emptyState = user && user.projectCount > 0 ? 'project' : 'post'
    const hasPosts = !!posts

    // TODO: Remove when have IDs
    return (
      <InfiniteListWithHandler
        scrollEnabled={hasPosts}
        scrollRef={ref => {
          scrollView = ref
        }}
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListHeaderComponent={user && <Header user={user} spacingHorizontal={!hasPosts} />}
        ListEmptyComponent={<EmptyState type={emptyState} />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={(item, index) => item.node.id + index}
        renderItem={this.renderItem}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
          useNativeDriver: true,
        })}
      />
    )
  }
}

export default compose(getCurrentUserProfile)(Me)
