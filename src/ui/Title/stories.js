import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding } from 'storybook/decorators'
import Title from '.'

storiesOf('UI/Title', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Title>Here is a title!</Title>)
