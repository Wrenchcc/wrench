import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from 'navigation'
import { Text } from 'ui'
import Background from './Background'
import { Base, Row } from './styles'

const HalfPanel = ({ renderContent = () => null, data }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismissHalfpanel } = useNavigation()

  useEffect(() => {
    bottomSheetModalRef.current?.present()
  }, [bottomSheetModalRef])

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

  // callbacks
  const handlePresent = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const renderDataContent = () => (
    <Base>
      {data.map(({ title, onPress }) => {
        const handleOnPress = () => {
          onPress()
          handleDismiss()
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

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        // backgroundComponent={Background}
        onDismiss={dismissHalfpanel}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        {data ? renderDataContent : renderContent()}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default HalfPanel
