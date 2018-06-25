import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding } from 'storybook/decorators'
import Badge from '.'

storiesOf('UI/Badge', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Badge />)
