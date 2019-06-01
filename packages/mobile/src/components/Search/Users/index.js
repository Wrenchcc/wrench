import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { User, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 70

class Users extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
    users: PropTypes.array,
    query: PropTypes.string,
  }

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  renderItem = ({ item }) => <User data={item.node} />

  render() {
    const { fetchMore, hasNextPage, isFetching, isRefetching, refetch, users, query } = this.props

    return (
      <InfiniteList
        borderSeparator
        paddingBottom={40}
        getItemLayout={this.getItemLayout}
        ListEmptyComponent={!isFetching && <NoResults />}
        data={users}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        keyExtractor={item => item.node.id}
        refetch={refetch}
        renderItem={this.renderItem}
        defaultPadding
        ListFooterComponent={
          (query.length === 1 && !users) || (isFetching && query.length !== 0) ? (
            <SearchingFor query={query} />
          ) : (
            hasNextPage && <Loader />
          )
        }
      />
    )
  }
}

export default searchUsers(Users)
