// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  LogoIcon,
  LogoRoundedIcon,
  MenuIcon,
  ArrowRightAlternativeIcon,
  ArrowLeftAlternativeIcon,
  ArrowLeftIcon,
  CloseIcon,
  AppStoreIcon,
  GooglePlayIcon,
  SparkIcon,
  NotificationIcon,
  CheckMarkIcon,
  ArrowDownIcon,
  EmailIcon,
  CopyIcon,
  FacebookIcon,
  MessengerIcon,
  TwitterIcon,
  ChevronRightIcon,
  BookmarkIcon,
} from '.'

storiesOf('Icons', module)
  .add('LogoIcon', () => <LogoIcon width="100" height="100" />)
  .add('LogoIcon - Inverted', () => <LogoIcon width="100" height="100" inverted />)
  .add('LogoRoundedIcon', () => <LogoRoundedIcon width="100" height="100" />)
  .add('LogoRoundedIcon - Inverted', () => <LogoRoundedIcon width="100" height="100" inverted />)
  .add('MenuIcon', () => <MenuIcon />)
  .add('CloseIcon', () => <CloseIcon width={20} height={20} />)
  .add('ArrowLeftIcon', () => <ArrowLeftIcon />)
  .add('ArrowRightAlternativeIcon', () => <ArrowRightAlternativeIcon width={44} height={48} />)
  .add('ArrowLeftAlternativeIcon', () => <ArrowLeftAlternativeIcon width={44} height={48} />)
  .add('AppStoreIcon', () => <AppStoreIcon />)
  .add('GooglePlayIcon', () => <GooglePlayIcon />)
  .add('SparkIcon', () => <SparkIcon />)
  .add('SparkIcon - Small', () => <SparkIcon small />)
  .add('NotificationIcon', () => <NotificationIcon />)
  .add('ArrowDownIcon', () => <ArrowDownIcon />)
  .add('EmailIcon', () => <EmailIcon />)
  .add('CopyIcon', () => <CopyIcon />)
  .add('FacebookIcon', () => <FacebookIcon />)
  .add('MessengerIcon', () => <MessengerIcon />)
  .add('TwitterIcon', () => <TwitterIcon />)
  .add('CheckMarkIcon', () => <CheckMarkIcon />)
  .add('ChevronRightIcon', () => <ChevronRightIcon />)
  .add('BookmarkIcon', () => <BookmarkIcon />)
  .add('BookmarkIcon - Selected', () => <BookmarkIcon fill="black" color="black" />)
