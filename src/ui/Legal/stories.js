import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBackground, withCenter } from 'storybook/decorators'
import Legal from '.'

storiesOf('UI/Legal', module)
  .addDecorator(withCenter)
  .addDecorator(withBackground('black'))
  .add('default', () => <Legal />)
