import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding, withBackground } from 'storybook/decorators'
import { COLORS } from 'ui/constants'
import { TYPES } from './constants'
import EmptyState from '.'

storiesOf('UI/EmptyState', module)
  .addDecorator(withBasePadding)
  .addDecorator(withBackground(COLORS.DIVIDER))
  .add('Project', () => <EmptyState type={TYPES.PROJECT} />)
  .add('Post', () => <EmptyState type={TYPES.POST} />)
