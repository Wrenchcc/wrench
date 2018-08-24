import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import { translate } from 'react-i18next'
import createClient from 'graphql/createClient'
import { getTokens } from 'graphql/utils/auth'
import { setLanguage } from 'i18n/helpers'

const { Provider, Consumer } = React.createContext()

class AppStateWithI18n extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    i18n: PropTypes.object.isRequired,
  }

  state = {
    client: createClient(),
    loggedIn: false,
    appLoading: true,
  }

  async componentDidMount() {
    const tokens = await getTokens()

    SplashScreen.hide()

    this.setState({
      loggedIn: !!tokens,
      appLoading: false,
    })
  }

  onChangeLanguage = async lang => {
    await setLanguage(lang)
    this.props.i18n.changeLanguage(lang)
  }

  handleLoginState = loggedIn => {
    if (!loggedIn) {
      this.state.client.resetStore()
    }

    this.setState({
      loggedIn,
    })
  }

  render() {
    const { i18n } = this.props
    return (
      <Provider
        value={{
          changeLoginState: this.handleLoginState,
          changeLanguage: this.onChangeLanguage,
          currentLanguage: i18n.language,
          supportedLanguages: i18n.languages,
          ...this.state,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

// Wrapping a app with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
export const AppStateProvider = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(AppStateWithI18n)

export const AppStateConsumer = Consumer
