import React, { useEffect, useRef, useCallback } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated from 'react-native-reanimated'
import { useNavigation } from 'navigation'
import { Text } from 'ui'
import { Base, Bar, Row } from './styles'

const { Value, interpolate } = Animated

function Halfpanel({ renderContent = () => null, renderHeader = () => null, height = 300, data }) {
  const bottomSheet = useRef(null)
  const fall = useRef(new Value(1))
  const allowCloseEnd = useRef(false)
  const { dismissHalfpanel } = useNavigation()

  useEffect(() => {
    bottomSheet.current.snapTo(1)
  }, [])

  const backgroundOpacity = interpolate(fall.current, {
    inputRange: [0, 1],
    outputRange: [0.55, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const handleClose = useCallback(() => {
    bottomSheet.current.snapTo(0)
  }, [])

  const handleOpenStart = useCallback(() => {
    allowCloseEnd.current = true
  }, [])

  const handleCloseEnd = useCallback(() => {
    if (!allowCloseEnd.current) {
      return
    }

    dismissHalfpanel()
  }, [])

  const renderDataContent = () => (
    <Base height={height}>
      <Bar />

      {data.map(({ title, onPress }) => {
        const handleOnPress = () => {
          handleClose()
          setTimeout(onPress, 200)
        }

        return (
          <Row key={title}>
            <Text onPress={handleOnPress} fontSize={17}>
              {title}
            </Text>
          </Row>
        )
      })}
    </Base>
  )

  return (
    <>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'black',
              opacity: backgroundOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={bottomSheet}
        callbackNode={fall.current}
        snapPoints={[0, height]}
        renderHeader={renderHeader}
        renderContent={data ? renderDataContent : renderContent}
        onOpenStart={handleOpenStart}
        onCloseEnd={handleCloseEnd}
      />
    </>
  )
}

export default Halfpanel
