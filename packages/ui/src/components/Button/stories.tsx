import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './'

storiesOf('Button', module)
  .add('Primary', () => <Button />)
  .add('Primary with border', () => <Button />)
  .add('Secondary', () => <Button />)
  .add('Secondary with border', () => <Button />)
  .add('Outline', () => <Button />)
  .add('Floating', () => <Button />)
