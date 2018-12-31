import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { getNotifications } from 'graphql/queries/getNotifications'
import { markAllNotificationsSeen } from 'graphql/mutations/notification/markAllNotificationsSeen'
import { InfiniteListWithHandler, Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import { Header } from './styles'

class Notifications extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    markAllNotificationsSeen: PropTypes.func.isRequired,
    notifications: PropTypes.array,
    refetch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    // TODO: Only when have unSeened notifications
    this.props.markAllNotificationsSeen()
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

    const hasNotifications = notifications && notifications.length > 0

    return (
      <InfiniteListWithHandler
        scrollEnabled={hasNotifications}
        paddingHorizontal={hasNotifications ? 20 : 0}
        contentContainerStyle={{ flex: hasNotifications ? 0 : 1 }}
        defaultPaddingTop
        ListHeaderComponent={
          <Header medium spacingHorizontal={!hasNotifications}>
            {t('Notifications:title')}
          </Header>
        }
        ListEmptyComponent={<EmptyState type={TYPES.NOTIFICATIONS} />}
        borderSeparator
        initialNumToRender={10}
        data={notifications}
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

export default compose(
  getNotifications,
  markAllNotificationsSeen,
  withNamespaces('Notifications')
)(Notifications)
