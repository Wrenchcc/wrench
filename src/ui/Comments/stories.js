import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withBasePadding } from 'storybook/decorators'
import data from 'fixtures/comments'
import Comments from '.'

storiesOf('UI/Comments', module)
  .addDecorator(withBasePadding)
  .add('default', () => <Comments onPress={action('onPress')} data={data} />)
