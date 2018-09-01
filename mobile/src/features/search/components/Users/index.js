import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { User, InfiniteList } from 'ui'

// TODO: Pass search query
class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    scrollRef: PropTypes.func.isRequired,
  }

  renderItem = ({ item }) => <User data={item.node} />

  // TODO: Remove when have IDs
  render() {
    const {
      users,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      scrollRef,
    } = this.props

    return (
      <InfiniteList
        borderSeparator
        data={users}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={(item, index) => item.node.id + index}
        renderItem={this.renderItem}
        scrollRef={scrollRef}
      />
    )
  }
}

export default compose(searchUsers)(Users)
