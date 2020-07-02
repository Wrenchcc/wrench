import React, { useEffect, useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { useNavigation } from 'navigation'
import { Text } from 'ui'
import { Base, Bar, Row } from './styles'

function Halfpanel({ renderContent = () => null, renderHeader = () => null, height = 300, data }) {
  const bottomSheet = useRef()
  const { dismissHalfpanel } = useNavigation()

  useEffect(() => {
    bottomSheet.current.snapTo(1)
  }, [])

  const allowCloseEnd = useRef(false)

  const handleOpenStart = () => {
    allowCloseEnd.current = true
  }

  const handleCloseEnd = () => {
    if (!allowCloseEnd.current) {
      return
    }

    dismissHalfpanel()
  }

  const renderDataContent = () => (
    <Base height={height}>
      <Bar />
      {data.map(({ title, onPress }) => {
        const handleOnPress = () => {
          bottomSheet.current.snapTo(0)
          setTimeout(onPress, 200)
        }

        return (
          <Row key={title} style={{}}>
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
      ref={bottomSheet}
      snapPoints={[0, height]}
      renderHeader={renderHeader}
      renderContent={data ? renderDataContent : renderContent}
      onOpenStart={handleOpenStart}
      onCloseEnd={handleCloseEnd}
    />
  )
}

export default Halfpanel
