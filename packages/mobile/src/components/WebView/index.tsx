import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { useTranslation } from 'react-i18next'
import { WebView as RNWebView } from 'react-native-webview'
import qs from 'url'
import { dismissModal } from 'navigation'
import { Header, ProgressBar, Text, Icon, Touchable, Share } from 'ui'
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

  const handleGoBack = useCallback(() => webview.current.goBack(), [webview])
  const handleRefresh = useCallback(() => webview.current.reload(), [webview])
  const handleGoForward = useCallback(() => webview.current.goForward(), [webview])

  const handleClose = useCallback(() => dismissModal(), [dismissModal])

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

  const handleOnNavigationStateChange = useCallback(navState => {
    if (navState.url) {
      setUrl(navState.url)
    }

    if (navState.title) {
      setTitle(navState.title)
    }

    if (navState.canGoBack) {
      setCanGoBack(navState.canGoBack)
    }

    if (navState.canGoForward) {
      setCanGoForward(navState.canGoForward)
    }
  }, [])

  const handleOnLoadProgress = ({ nativeEvent }) => {
    setProgress(nativeEvent.progress * 100)
  }

  const onLoadEnd = useCallback(() => {
    setProgress(0)
  }, [])

  const onLoadError = useCallback(() => {
    setProgress(0)
  }, [])

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
        headerLeft={<Icon onPress={handleClose} source={closeDark} />}
        headerTitle={
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
        source={{ uri: url }}
        useWebKit
        onLoadEnd={onLoadEnd}
        onError={onLoadError}
        onNavigationStateChange={handleOnNavigationStateChange}
        onLoadProgress={handleOnLoadProgress}
        ref={webview}
        decelerationRate="fast"
      />

      {renderFooter()}
    </Base>
  )
}

export default WebView
