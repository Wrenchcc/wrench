import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import { Query } from 'react-apollo'
import { NAVIGATORS } from 'navigation'
import { getCurrentUserQuery } from 'graphql/queries/user'

export default class AuthLoading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onCompleted = ({ currentUser }) => {
    SplashScreen.hide()

    // Navigate to route based on current user or not
    this.props.navigation.navigate(
      currentUser ? NAVIGATORS.APP_NAVIGATOR : NAVIGATORS.AUTH_NAVIGATOR
    )
  }

  render() {
    return (
      <Query query={getCurrentUserQuery} onCompleted={this.onCompleted}>
        {data => console.log(data) || null}
      </Query>
    )
  }
}
