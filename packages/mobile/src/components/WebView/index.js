import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { useTranslation } from 'react-i18next'
import { WebView as RNWebView } from 'react-native-webview'
import qs from 'url'
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

function WebView({ url: initialUrl }) {
  const { t } = useTranslation()
  const webview = useRef()
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(initialUrl)
  const [title, setTitle] = useState(t('WebView:loading'))
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  const handleGoBack = () => webview.current.goBack()
  const handleRefresh = () => webview.current.reload()
  const handleGoForward = () => webview.current.goForward()

  const handleClose = () => dismissModal()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        handleGoBack()
        return true
      }
      return false
    })
    return () => backHandler.remove()
  }, [])

  // const onNavigationStateChange = useCallback(navState => {
  // setUrl(navState.url)
  // setTitle(navState.title)
  // setCanGoBack(navState.canGoBack)
  // setCanGoForward(navState.canGoForward)
  // if (isLoading.current) {
  //   progress.current += (1 / Math.pow(2, progressTimes.current)) * 100
  // }
  // }, [])

  const onLoadEnd = () => {
    setProgress(0)
  }

  const onLoadError = () => {}

  const setCustomHeaders = () => {
    const appName = DeviceInfo.getApplicationName()

    return {
      [`X-${appName}-Version`]: `v${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`,
      [`X-${appName}-Type`]: `${appName}-${DeviceInfo.getSystemName()}`,
    }
  }

  const renderFooter = () => (
    <Footer>
      <Inner>
        <Touchable onPress={handleGoBack} style={{ marginRight: 50 }}>
          <View style={{ opacity: canGoBack ? 1 : 0.5 }}>
            <Icon source={arrowLeftSmall} onPress={handleGoBack} />
          </View>
        </Touchable>
        <Touchable onPress={handleGoForward}>
          <View style={{ opacity: canGoForward ? 1 : 0.5 }}>
            <Icon source={arrowRightSmall} onPress={handleGoForward} />
          </View>
        </Touchable>
      </Inner>
      <Share title={title} url={url} />
    </Footer>
  )

  return (
    <Base>
      <Header
        transparent={false}
        headerLeft={<Icon onPress={handleClose} source={closeDark} />}
        headerCenter={
          <View style={{ alignItems: 'center' }}>
            <Text medium fontSize={15} numberOfLines={1} style={{ marginBottom: 3 }}>
              {title}
            </Text>
            <Text fontSize={11} numberOfLines={1} color="light_grey">
              {qs.parse(url).host}
            </Text>
          </View>
        }
        headerRight={<Icon onPress={handleRefresh} source={refresh} />}
      />

      <ProgressBar
        opacity={progress > 0 ? 1 : 0}
        fillColor="black"
        borderRadius={0}
        barHeight={2}
        progress={progress}
      />

      <RNWebView
        style={{ flex: 1, backgroundColor: COLORS.WHITE }}
        source={{ uri: url, headers: setCustomHeaders() }}
        useWebKit
        onLoadEnd={onLoadEnd}
        onError={onLoadError}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress * 100)
        }}
        ref={webview}
      />

      {renderFooter()}
    </Base>
  )
}

export default WebView
