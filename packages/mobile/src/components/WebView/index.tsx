import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { useTranslation } from 'react-i18next'
import qs from 'url'
import { useNavigation } from 'navigation'
import Header from 'navigation/Page/Header'
import { ProgressBar, Icon, Touchable, Share } from 'ui'
import { arrowLeftSmall, arrowRightSmall, refresh, close } from 'images'
import { Base, BaseWebView, Footer, Inner } from './styles'

function WebView({ url: initialUrl }) {
  const { t } = useTranslation('webview')
  const webview = useRef(null)

  const { dismissModal } = useNavigation()
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(initialUrl)
  const [title, setTitle] = useState(t('loading'))
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  const handleGoBack = useCallback(() => webview.current.goBack(), [webview])
  const handleRefresh = useCallback(() => webview.current.reload(), [webview])
  const handleGoForward = useCallback(() => webview.current.goForward(), [webview])

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

  const handleOnNavigationStateChange = useCallback((navState) => {
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
        disableAnimation
        headerTitle={title}
        headerSubTitle={qs.parse(url).host}
        headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
        headerRight={<Icon onPress={handleRefresh} source={refresh} />}
        inline
      />

      <ProgressBar
        opacity={progress > 0 ? 1 : 0}
        borderRadius={0}
        barHeight={2}
        progress={progress}
      />

      <BaseWebView
        source={{ uri: url }}
        onLoadEnd={onLoadEnd}
        onError={onLoadError}
        onNavigationStateChange={handleOnNavigationStateChange}
        onLoadProgress={handleOnLoadProgress}
        ref={webview}
        decelerationRate="normal"
      />

      {renderFooter()}
    </Base>
  )
}

export default WebView
