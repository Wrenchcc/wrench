// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  LogoIcon,
  LogoRoundedIcon,
  MenuIcon,
  ArrowRightAlternativeIcon,
  ArrowLeftAlternativeIcon,
  CloseIcon,
} from '.'

storiesOf('Icons', module)
  .add('LogoIcon', () => <LogoIcon width="100" height="100" />)
  .add('LogoIcon - Inverted', () => <LogoIcon width="100" height="100" inverted />)
  .add('LogoRoundedIcon', () => <LogoRoundedIcon width="100" height="100" />)
  .add('LogoRoundedIcon - Inverted', () => <LogoRoundedIcon width="100" height="100" inverted />)
  .add('MenuIcon', () => <MenuIcon />)
  .add('CloseIcon', () => <CloseIcon width={20} height={20} />)
  .add('ArrowRightAlternativeIcon', () => <ArrowRightAlternativeIcon width={44} height={48} />)
  .add('ArrowLeftAlternativeIcon', () => <ArrowLeftAlternativeIcon width={44} height={48} />)
