import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withCenter } from 'storybook/decorators'
import Follow from '.'

storiesOf('UI/Follow', module)
  .addDecorator(withCenter)
  .add('follow', () => <Follow onPress={action('onPress')} following={false} />)
  .add('unfollow', () => <Follow onPress={action('onPress')} following />)
