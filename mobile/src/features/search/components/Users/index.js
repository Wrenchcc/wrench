import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { User, InfiniteList } from 'ui'
import NoResults from '../NoResults'

class Users extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
    scrollRef: PropTypes.func.isRequired,
    users: PropTypes.array,
  }

  renderItem = ({ item }) => <User data={item.node} />

  render() {
    const {
      fetchMore,
      hasNextPage,
      isFetching,
      isRefetching,
      refetch,
      scrollRef,
      users,
    } = this.props

    return (
      <InfiniteList
        borderSeparator
        ListEmptyComponent={<NoResults />}
        data={users}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isRefetching={isRefetching}
        keyExtractor={item => item.node.id}
        refetch={refetch}
        renderItem={this.renderItem}
        scrollRef={scrollRef}
      />
    )
  }
}

export default compose(searchUsers)(Users)
