import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pathOr, equals } from 'ramda'
import { Animated } from 'react-native'
import { compose } from 'react-apollo'
import { getUserByUsername } from 'graphql/queries/user/getUser'
import { InfiniteListWithHandler, Post, Share, HeaderTitle } from 'ui'
import FollowingProjects from 'features/profile/components/FollowingProjects'
import Header from 'features/profile/components/Header'

const HEADER_HEIGHT = 100
const START_OPACITY = 0

let scrollView = null

class User extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const fullName = pathOr(false, ['user', 'fullName'], params)
    const dynamicLink = pathOr(false, ['user', 'dynamicLink'], params)

    return {
      headerTitle: fullName && (
        <HeaderTitle
          opacity={params.opacity || new Animated.Value(0)}
          onPress={() => scrollView.scrollToOffset({ offset: 0 })}
        >
          {fullName}
        </HeaderTitle>
      ),
      headerRight: dynamicLink && <Share title={fullName} url={dynamicLink} text />,
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
        inputRange: [START_OPACITY, HEADER_HEIGHT],
        outputRange: [0, 1],
      }),
    })
  }

  // Add user to navigationOptions when loaded
  componentDidUpdate(prevProps) {
    if (!equals(this.props.user, prevProps.user)) {
      this.props.navigation.setParams({ user: this.props.user })
    }
  }

  renderItem = ({ item }) => <Post post={item.node} />

  render() {
    const { posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    const hasPosts = posts && posts.length > 0

    return (
      <InfiniteListWithHandler
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        scrollRef={ref => {
          scrollView = ref
        }}
        ListHeaderComponent={user && <Header user={user} spacingHorizontal={!hasPosts} />}
        ListEmptyComponent={<FollowingProjects user={user} />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
          useNativeDriver: true,
        })}
      />
    )
  }
}

export default compose(getUserByUsername)(User)
