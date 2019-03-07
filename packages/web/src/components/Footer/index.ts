import React from 'react'
import { Text } from '../../ui'
import { Base, Inner, Bottom } from './styles'

function Footer() {
  return (
    <Base>
      <Inner>
        <Bottom>
          <Text fontSize={13} color="grey">
            Wrench is a project community founded in 2018 in Sweden. It’s designed, built and run
            from the heart of Stockholm.
          </Text>
          <Text fontSize={13} color="grey">
            © Wrench
          </Text>
        </Bottom>
      </Inner>
    </Base>
  )
}

export default Footer
