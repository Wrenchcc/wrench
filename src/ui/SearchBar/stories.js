import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding } from 'storybook/decorators'
import SearchBar from '.'

storiesOf('UI/SearchBar', module)
  .addDecorator(withBasePadding)
  .add('default', () => <SearchBar />)
