import React, { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated } from 'react-native'
import Text from 'ui/Text'
import { Button, HEIGHT, TOP } from './styles'

const DURATION = 650
const DELAY = 3000

function ShowLatest({ onPress, onHide }) {
  const { t } = useTranslation()
  const transformY = useRef(new Animated.Value(-100))

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

  const handleOnPress = useCallback(() => {
    onPress()
    Animated.spring(transformY.current, {
      toValue: -50,
      delay: 50,
      duration: DURATION,
      useNativeDriver: true,
    }).start(onHide)
  }, [onPress, onHide])

  return (
    <Animated.View
      style={{
        transform: [{ translateY: transformY.current }],
        alignSelf: 'center',
        height: HEIGHT,
      }}
    >
      <Button onPress={handleOnPress}>
        <Text color="white" fontSize={15} medium>
          {t('ShowLatest:button')}
        </Text>
      </Button>
    </Animated.View>
  )
}

export default ShowLatest
