import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { useTranslation } from 'react-i18next'
import { WebView as RNWebView } from 'react-native-webview'
import qs from 'url'
import { Page } from 'navigation'
import { NAVIGATION_COMPONENTS } from 'navigation/constants'
import { ProgressBar, Icon, Touchable, Share } from 'ui'
import { COLORS } from 'ui/constants'
import { arrowLeftSmall, arrowRightSmall, refresh } from 'images'
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
    <Page
      view
      headerAnimation={false}
      headerTitleFontSize={15}
      headerTitle={title}
      headerSubTitle={qs.parse(url).host}
      headerRight={{
        component: {
          name: NAVIGATION_COMPONENTS.CUSTOM_BUTTON,
          passProps: {
            children: <Icon onPress={handleRefresh} source={refresh} />,
          },
        },
      }}
    >
      <Base>
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
          onLoadEnd={onLoadEnd}
          onError={onLoadError}
          onNavigationStateChange={handleOnNavigationStateChange}
          onLoadProgress={handleOnLoadProgress}
          ref={webview}
          decelerationRate="fast"
        />

        {renderFooter()}
      </Base>
    </Page>
  )
}

export default WebView
