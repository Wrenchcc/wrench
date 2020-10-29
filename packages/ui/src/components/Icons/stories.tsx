import React from 'react'
import { storiesOf } from '@storybook/react'
import { ArrowRightAlternativeIcon, ArrowLeftAlternativeIcon, CloseIcon } from '.'

storiesOf('Icons', module)
  .add('CloseIcon', () => <CloseIcon width={20} height={20} />)
  .add('ArrowRightAlternativeIcon', () => <ArrowRightAlternativeIcon width={44} height={48} />)
  .add('ArrowLeftAlternativeIcon', () => <ArrowLeftAlternativeIcon width={44} height={48} />)
