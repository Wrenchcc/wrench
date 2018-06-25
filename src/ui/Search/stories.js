import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withBasePadding } from 'storybook/decorators'
import Search from '.'

storiesOf('UI/Search', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Search onPress={action('onPress')} />)
