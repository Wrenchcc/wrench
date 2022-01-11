import React, { useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useNavigation } from 'navigation'
import { Text } from 'ui'
import Background from './Background'
import { Base, Bar, Row } from './styles'

const HalfPanel = ({ renderContent = () => null, data, height }) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { dismissHalfpanel } = useNavigation()

  const snapPoints = useMemo(() => [height], [height])

  const handleOnChange = useCallback((index) => {
    if (index === -1) {
      dismissHalfpanel()
    }
  }, [])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  )

  const RenderDataContent = () => (
    <Base>
      {data.map(({ title, onPress }) => {
        const handleOnPress = () => {
          bottomSheetRef?.current.close()
          setTimeout(() => {
            onPress()
            dismissHalfpanel()
          }, 100)
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
    <BottomSheet
      handleComponent={null}
      onChange={handleOnChange}
      backgroundComponent={Background}
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      enablePanDownToClose
      animateOnMount
      index={0}
      snapPoints={snapPoints}
    >
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Bar />
        {data ? <RenderDataContent /> : renderContent()}
      </View>
    </BottomSheet>
  )
}

export default HalfPanel
