import React from 'react'
import { storiesOf } from '@storybook/react'
import BaseStyles from './'

storiesOf('BaseStyles', module).add('Global', () => (
  <>
    <BaseStyles />
    This component sets the base styles, including normalize.css
  </>
))
