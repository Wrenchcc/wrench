import React, { useState } from 'react'
import { Dimensions, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { TabView, TabBar } from 'react-native-tab-view'
import { useNavigation } from 'navigation'
import Library from './screens/Library'
import Camera from './screens/Camera'
import { TAB_BAR_HEIGHT } from './constants'
import Alert from './Alert'

const { width, height } = Dimensions.get('window')

function MediaLibrary() {
  const { t } = useTranslation('media-library')
  const animatedValue = useSharedValue(0)
  const { dismissModal } = useNavigation()

  const [alert, setAlert] = useState({
    onDiscard: dismissModal,
    visible: false,
  })

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'library', title: t('library') },
    { key: 'camera', title: t('camera') },
  ])

  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      visible: false,
    })
  }

  const handleDiscarAlert = () => {
    setAlert({
      onDiscard: dismissModal,
      visible: false,
    })

    dismissModal()
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'library':
        return <Library animatedValue={animatedValue} />
      case 'camera':
        return <Camera active={index === 1} animatedValue={animatedValue} setAlert={setAlert} />
      default:
        return null
    }
  }

  const blahStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    }
  })

  const renderTabBar = (props) => (
    <Animated.View
      style={[
        {
          height: TAB_BAR_HEIGHT,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          zIndex: 10000000,
        },
        blahStyle,
      ]}
    >
      <TabBar
        {...props}
        indicatorStyle={{ height: 0 }}
        renderLabel={({ route, color }) => (
          <Text style={{ color, margin: 8, fontWeight: '500', fontSize: 16 }}>{route.title}</Text>
        )}
        style={{ backgroundColor: 'black', height: TAB_BAR_HEIGHT }}
      />
    </Animated.View>
  )

  return (
    <>
      <TabView
        lazy
        tabBarPosition="bottom"
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width, height }}
        style={{ backgroundColor: 'black' }}
      />

      {alert.visible && <Alert onCancel={handleCloseAlert} onDiscard={handleDiscarAlert} />}
    </>
  )
}

export default MediaLibrary
