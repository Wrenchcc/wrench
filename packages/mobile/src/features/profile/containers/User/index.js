import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getUserByUsername } from 'graphql-old/queries/user/getUser'
import { Post, Share } from 'ui'
import FollowingProjects from 'features/profile/components/FollowingProjects'
import Header from 'features/profile/components/Header'

class User extends PureComponent {
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {}
  //   const fullName = pathOr(false, ['user', 'fullName'], params)
  //   const dynamicLink = pathOr(false, ['user', 'dynamicLink'], params)
  //
  //   return {
  //     headerTitle: fullName && (
  //       <HeaderTitle
  //         opacity={params.opacity || new Animated.Value(0)}
  //         onPress={() => scrollView.scrollToOffset({ offset: 0 })}
  //       >
  //         {fullName}
  //       </HeaderTitle>
  //     ),
  //     headerRight: dynamicLink && <Share title={fullName} url={dynamicLink} />,
  //   }
  // }

  static propTypes = {
    user: PropTypes.object,
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item }) => <Post post={item.node} disabled />

  render() {
    const { posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    const hasPosts = posts && posts.length > 0

    return (
      <Layout>
        <FlatList
          spacingSeparator
          contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
          ListHeaderComponent={user && <Header user={user} />}
          ListEmptyComponent={<FollowingProjects user={user} />}
          data={posts}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
        />
      </Layout>
    )
  }
}

export default compose(getUserByUsername)(User)
