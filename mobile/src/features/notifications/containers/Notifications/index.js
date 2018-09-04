import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getNotifications } from 'graphql/queries/getNotifications'
import { InfiniteList, Notification } from 'ui'
import { Header } from './styles'

let scrollView = null

class Notifications extends Component {
  static navigationOptions = {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.isFocused()) {
        scrollView.scrollToOffset({ offset: 0 })
      } else {
        defaultHandler()
      }
    },
  }

  static propTypes = {
    notifications: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  componentWillUnmont() {
    scrollView = null
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
        scrollRef={ref => {
          scrollView = ref
        }}
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
  translate('Notifications')
)(Notifications)
