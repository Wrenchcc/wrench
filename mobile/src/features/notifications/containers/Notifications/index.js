import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { getNotifications } from 'graphql/queries/getNotifications'
import { InfiniteList, Notification } from 'ui'
import { Header } from './styles'

class Notifications extends PureComponent {
  static propTypes = {
    notifications: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item }) => <Notification data={item.node} />

  render() {
    const {
      notifications,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      t,
    } = this.props

    // TODO: Remove when have real IDs
    return (
      <InfiniteList
        defaultPaddingTop
        ListHeaderComponent={<Header medium>{t('Notifications:title')}</Header>}
        borderSeparator
        initialNumToRender={10}
        data={notifications}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={(item, index) => item.node.id + index}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(
  getNotifications,
  withNamespaces('Notifications')
)(Notifications)
