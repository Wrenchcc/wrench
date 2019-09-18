import React, { useCallback } from 'react'
import { useNavigation } from 'navigation'
import { close } from 'images'
import { Header, Icon } from 'ui'
import Legal from '../../components/Legal'
import Facebook from '../../components/Facebook'
import Google from '../../components/Google'
import Apple from '../../components/Apple'
import { Base, Inner, Row, Footer } from './styles'

function Other() {
  const { dismissModal } = useNavigation()

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [dismissModal])

  return (
    <Base>
      <Header headerLeft={<Icon source={close} color="dark" onPress={handleDismissModal} />} />
      <Inner>
        <Row>
          <Facebook />
        </Row>
        <Row>
          <Google border />
        </Row>
        <Row>
          <Apple border />
        </Row>

        <Footer>
          <Legal color="grey" />
        </Footer>
      </Inner>
    </Base>
  )
}

export default Other
