import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import { Query } from 'react-apollo'
import { NAVIGATORS } from 'navigation'
import getCurrentUserQuery from 'graphql/queries/getCurrentUser.graphql'

export default class AuthLoading extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  onCompleted({ getCurrentUser }, blah) {
    console.log(blah)
    console.log(this.props)

    // const { currentUser, loading } = this.props.data
    // if (!loading) {
    setTimeout(SplashScreen.hide, 500)
    // }

    // Navigate to route based on current user or not
    // this.props.navigation.navigate(
    //   currentUser ? NAVIGATORS.APP_NAVIGATOR : NAVIGATORS.AUTH_NAVIGATOR
    // )
  }

  render() {
    return (
      <Query query={getCurrentUserQuery}>
        {({ data, loading }) => {
          if (!loading) {
            this.props.navigation.navigate(
              data.getCurrentUser ? NAVIGATORS.APP_NAVIGATOR : NAVIGATORS.AUTH_NAVIGATOR
            )
          }
          return null
        }}
      </Query>
    )
  }
}
