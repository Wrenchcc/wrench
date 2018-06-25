import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withCenter } from 'storybook/decorators'
import Facebook from '.'

storiesOf('UI/Facebook', module)
  .addDecorator(withCenter)
  .add('default', () => <Facebook />)
