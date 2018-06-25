import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding } from 'storybook/decorators'
import Border from '.'

storiesOf('UI/Border', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Border />)
