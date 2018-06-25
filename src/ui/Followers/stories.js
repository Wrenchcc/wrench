import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withCenter } from 'storybook/decorators'
import Followers from '.'

storiesOf('UI/Followers', module)
  .addDecorator(withCenter)
  .add('100', () => <Followers followers={100} />)
  .add('1k', () => <Followers followers={1000} />)
  .add('10k', () => <Followers followers={10000} />)
  .add('100k', () => <Followers followers={100000} />)
  .add('1M', () => <Followers followers={1000000} />)
