import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getFeed } from 'graphql-old/queries/getFeed'
import { Post, PostProgress } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
import { registerUserLocale } from 'i18n'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'

class Feed extends PureComponent {
  static propTypes = {
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    registerForPushNotifications()
    registerUserLocale()
  }

  renderItem = ({ item }) => <Post post={item.node} />

  render() {
    const { posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <Layout search={{}}>
        <PostProgress />

        <FlatList
          spacingSeparator
          initialNumToRender={2}
          data={posts}
          ListEmptyComponent={<ProjectSuggestions />}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
          polling
        />
      </Layout>
    )
  }
}

export default compose(getFeed)(Feed)
