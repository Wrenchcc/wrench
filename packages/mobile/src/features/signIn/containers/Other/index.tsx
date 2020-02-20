import React, { useCallback, useEffect, useState } from 'react'
import * as AppleAuthentication from '@pontusab/react-native-apple-authentication'
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
  const [isAvailable, setAvailable] = useState(false)
  const providers = [<Facebook />, <Google border />]

  async function isAvailableAsync() {
    const isAvailable = await AppleAuthentication.isAvailableAsync()
    setAvailable(isAvailable)
  }

  useEffect(() => {
    isAvailableAsync()
  }, [])

  if (isAvailable) {
    providers.push(<Apple black />)
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
