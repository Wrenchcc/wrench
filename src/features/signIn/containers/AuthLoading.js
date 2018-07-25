import { Component } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import { graphql } from 'react-apollo'
import { NAVIGATORS } from 'navigation'
import getCurrentUser from 'graphql/queries/getCurrentUser.graphql'

class AuthLoading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.checkAuthenticated()
  }

  checkAuthenticated() {
    const { currentUser, loading } = this.props.data

    if (!loading) {
      setTimeout(SplashScreen.hide, 500)
    }

    // Navigate to route based on current user or not
    this.props.navigation.navigate(
      currentUser ? NAVIGATORS.APP_NAVIGATOR : NAVIGATORS.AUTH_NAVIGATOR
    )
  }

  render() {
    return null
  }
}

export default graphql(getCurrentUser)(AuthLoading)
