import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { searchUsers } from 'graphql/queries/searchUsers'
import { User, InfiniteList } from 'ui'

class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item }) => <User data={item.node} />

  render() {
    const { users, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <InfiniteList
        borderSeparator
        data={users}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(searchUsers)(Users)
