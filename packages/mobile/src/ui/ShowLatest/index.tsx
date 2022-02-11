import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { useScrollContext } from 'navigation'
import Text from 'ui/Text'
import { Button, HEIGHT } from './styles'

const FULLY_UP = -100
const FULLY_DOWN = 10
const ONE_POST_DOWN = 600

function ShowLatest({ onClose, isVisible }) {
  const { t } = useTranslation('show-latest')
  const { scrollY, scrollTo } = useScrollContext()
  const transformY = useSharedValue(FULLY_UP)

  useAnimatedReaction(
    () => scrollY.value,
    (result) => {
      if (result > ONE_POST_DOWN && transformY.value === FULLY_UP && isVisible.value) {
        transformY.value = withSpring(FULLY_DOWN, { mass: 0.5 })
      }

      if (result <= 0 && transformY.value === FULLY_DOWN && isVisible.value) {
        transformY.value = withSpring(FULLY_UP, { mass: 0.5 }, (isFinished) => {
          if (isFinished && onClose) {
            runOnJS(onClose)()
          }
        })
      }
    },
    [isVisible]
  )

  const handleOnPress = useCallback(() => {
    scrollTo(-1000)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: transformY.value }],
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
