import React, { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated } from 'react-native'
import Text from 'ui/Text'
import { Button, HEIGHT, TOP } from './styles'

const DURATION = 650
const DELAY = 3000

function LoadNewer({ onPress, hide }) {
  const transformY = useRef(new Animated.Value(-HEIGHT - TOP))
  const { t } = useTranslation()

  const handleOnPress = useCallback(() => {
    onPress()
    Animated.spring(transformY.current, {
      toValue: -50,
      delay: 50,
      duration: DURATION,
      useNativeDriver: true,
    }).start(hide)
  }, [onPress, hide])

  useEffect(() => {
    Animated.spring(transformY.current, {
      toValue: TOP,
      duration: DURATION,
      useNativeDriver: true,
    }).start(() => {
      Animated.sequence([
        Animated.delay(DELAY),
        Animated.spring(transformY.current, {
          toValue: -HEIGHT - TOP,
          duration: DURATION / 2,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }, [])

  return (
    <Animated.View
      style={{
        transform: [{ translateY: transformY.current }],
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
      }}
    >
      <Button onPress={handleOnPress}>
        <Text color="white" fontSize={15} medium>
          {t('LoadNewer:button')}
        </Text>
      </Button>
    </Animated.View>
  )
}

export default LoadNewer
