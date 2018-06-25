import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withBasePadding } from 'storybook/decorators'
import Button from '.'

storiesOf('UI/Button', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Button onPress={action('onPress')}>Press me</Button>)
