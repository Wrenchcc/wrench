import React from 'react'
import { Image } from 'react-native'
import { navigateToPost } from 'navigation'
import { add } from 'images'
import hitSlop from 'utils/hitSlop'
import { Button } from './styles'

const Add = props => (
  <Button hitSlop={hitSlop(20)} onPress={() => navigateToPost()} {...props}>
    <Image source={add} />
  </Button>
)

export default Add
