import React, { useCallback } from 'react'
import { useNavigation } from 'navigation'
import { close } from 'images'
import { Header, Icon } from 'ui'
import Legal from '../../components/Legal'
import Facebook from '../../components/Facebook'
import Google from '../../components/Google'
import Apple from '../../components/Apple'
import { Base, Inner, Row, Footer } from './styles'

const isAvailableAsync = false

function Other() {
  const { dismissModal } = useNavigation()
  const providers = [<Facebook />, <Google border />]

  if (isAvailableAsync) {
    providers.push(<Apple border />)
  }

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [dismissModal])

  return (
    <Base>
      <Header headerLeft={<Icon source={close} color="dark" onPress={handleDismissModal} />} />
      <Inner>
        {providers.map((Provider, i) => (
          <Row key={i}>{Provider}</Row>
        ))}

        <Footer>
          <Legal color="grey" />
        </Footer>
      </Inner>
    </Base>
  )
}

export default Other
