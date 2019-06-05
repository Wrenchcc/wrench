import React, { PureComponent } from 'react'
import { View, BackHandler } from 'react-native'
import { WebView as RNWebView } from 'react-native-webview'
// import withTranslation from 'i18n/withTranslation'
import url from 'url'
import { equals, reject } from 'ramda'
import DeviceInfo from 'react-native-device-info'
import { dismissModal } from 'navigation'
import Header from 'ui/Header'
import ProgressBar from 'ui/ProgressBar'
import Text from 'ui/Text'
import Icon from 'ui/Icon'
import Touchable from 'ui/Touchable'
import Share from 'ui/Share'
import { COLORS } from 'ui/constants'
import { closeDark, arrowLeftSmall, arrowRightSmall, refresh } from 'images'
import { Base, Footer, Inner } from './styles'

class WebView extends PureComponent {
  // static propTypes = {
  //   url: PropTypes.string.isRequired,
  // }

  constructor(props) {
    super(props)
    this.state = {
      title: 'Loading...', // props.t('WebView:loading'),
      url: props.url,
    }

    this.isLoading = false
    this.progress = 0
    this.progressTimes = 1

    this.onLoadStartHandlers = [this.startProgressBar]
    this.onLoadEndHandlers = [this.finishProgressBar, this.onFirstPageLoadEnd]
    this.onLoadErrorHandlers = []

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  onNavigationStateChange = navState => {
    this.setState(prevState => ({
      title: navState.title || prevState.title,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url,
    }))

    if (this.isLoading) {
      this.increaseProgress()
    }
  }

  onLoadEnd = args => this.onLoadEndHandlers.forEach(fn => fn(args))

  onLoadStart = args => this.onLoadStartHandlers.forEach(fn => fn(args))

  onLoadError = args => this.onLoadErrorHandlers.forEach(fn => fn(args))

  onFirstPageLoadEnd = () => {
    this.removeHandler('onLoadEndHandlers', this.onFirstPageLoadEnd)
  }

  setCustomHeaders() {
    const appName = DeviceInfo.getApplicationName()

    return {
      [`X-${appName}-Version`]: `v${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`,
      [`X-${appName}-Type`]: `${appName}-${DeviceInfo.getSystemName()}`,
    }
  }

  handleBackPress = () => {
    if (this.state.canGoBack) {
      this.goBack()
      return true
    }
    return false
  }

  goBack = () => this.webview.goBack()

  goForward = () => this.webview.goForward()

  refresh = () => this.webview.reload()

  removeHandler = (handlersList, handler) => {
    this[handlersList] = reject(equals(handler), this[handlersList])
  }

  startProgressBar = () => {
    if (!this.isLoading) {
      this.isLoading = true
      this.progress = 0
    }
  }

  finishProgressBar = () => {
    this.isLoading = false
    this.progressTimes = 1
    this.progress = 0
  }

  increaseProgress() {
    if (this.isLoading) {
      this.progress += (1 / Math.pow(2, this.progressTimes)) * 100 // eslint-disable-line
    }
  }

  renderFooter = () => (
    <Footer>
      <Inner>
        <Touchable onPress={this.goBack} style={{ marginRight: 50 }}>
          <View style={{ opacity: this.state.canGoBack ? 1 : 0.5 }}>
            <Icon source={arrowLeftSmall} onPress={this.goBack} />
          </View>
        </Touchable>
        <Touchable onPress={this.goForward}>
          <View style={{ opacity: this.state.canGoForward ? 1 : 0.5 }}>
            <Icon source={arrowRightSmall} onPress={this.goForward} />
          </View>
        </Touchable>
      </Inner>
      <Share title={this.state.title} url={this.state.url} />
    </Footer>
  )

  render() {
    return (
      <Base>
        <Header
          transparent={false}
          headerLeft={<Icon onPress={() => dismissModal()} source={closeDark} />}
          headerCenter={
            <View style={{ alignItems: 'center' }}>
              <Text medium fontSize={15} numberOfLines={1} style={{ marginBottom: 3 }}>
                {this.state.title}
              </Text>
              <Text fontSize={11} numberOfLines={1} color="light_grey">
                {url.parse(this.state.url).host}
              </Text>
            </View>
          }
          headerRight={<Icon onPress={this.refresh} source={refresh} />}
        />
        <ProgressBar
          opacity={this.isLoading ? 1 : 0}
          fillColor="black"
          borderRadius={0}
          barHeight={2}
          progress={this.progress}
        />

        <RNWebView
          style={{ flex: 1, backgroundColor: COLORS.WHITE }}
          source={{ uri: this.props.url, headers: this.setCustomHeaders() }}
          javaScriptEnabled
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadError}
          onNavigationStateChange={this.onNavigationStateChange}
          ref={ref => {
            this.webview = ref
          }}
        />

        {this.renderFooter()}
      </Base>
    )
  }
}

export default WebView
