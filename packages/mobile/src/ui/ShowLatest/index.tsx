import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { useScrollContext } from 'navigation'
import Text from 'ui/Text'
import { Button, HEIGHT } from './styles'

const FULLY_UP = -100
const FULLY_DOWN = 10
const ONE_POST_DOWN = 1000

function ShowLatest({ onPress, onHide }) {
  const { t } = useTranslation('show-latest')
  const { scrollY, scrollTo } = useScrollContext()
  const transfirmY = useSharedValue(FULLY_UP)

  useAnimatedReaction(
    () => scrollY.value,
    (result) => {
      if (result > ONE_POST_DOWN && transfirmY.value === FULLY_UP) {
        transfirmY.value = withSpring(FULLY_DOWN, { mass: 0.5 })
      }
    }
  )

  useAnimatedReaction(
    () => scrollY.value,
    (result) => {
      if (result <= 0 && transfirmY.value === FULLY_DOWN) {
        transfirmY.value = withSpring(FULLY_UP, { mass: 0.5 }, (isFinished) => {
          if (isFinished && onHide) {
            runOnJS(onHide)()
          }
        })
      }
    }
  )

  const handleOnPress = useCallback(() => {
    scrollTo(-1000)
  }, [onPress])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: transfirmY.value }],
  }))

  return (
    <Animated.View
      style={[
        {
          alignSelf: 'center',
          height: HEIGHT,
        },
        animatedStyle,
      ]}
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
