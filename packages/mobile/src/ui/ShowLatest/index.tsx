import React, { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated } from 'react-native'
import Text from 'ui/Text'
import { Button, HEIGHT, TOP } from './styles'

const DELAY = 5000

function ShowLatest({ onPress, onHide }) {
  const { t } = useTranslation('show-latest')
  const transformY = useRef(new Animated.Value(-100))

  useEffect(() => {
    Animated.spring(transformY.current, {
      toValue: TOP,
      useNativeDriver: true,
    }).start(() => {
      Animated.sequence([
        Animated.delay(DELAY),
        Animated.spring(transformY.current, {
          toValue: -HEIGHT - TOP,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }, [])

  const handleOnPress = useCallback(() => {
    onPress()
    Animated.spring(transformY.current, {
      delay: 50,
      toValue: -50,
      useNativeDriver: true,
    }).start(onHide)
  }, [onPress, onHide])

  return (
    <Animated.View
      style={{
        alignSelf: 'center',
        height: HEIGHT,
        transform: [{ translateY: transformY.current }],
      }}
    >
      <Button onPress={handleOnPress}>
        <Text color="default" fontSize={15} medium>
          {t('button')}
        </Text>
      </Button>
    </Animated.View>
  )
}

export default ShowLatest
