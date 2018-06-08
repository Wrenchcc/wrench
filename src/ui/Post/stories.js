import React from 'react'
import { storiesOf } from '@storybook/react-native'
import posts from 'fixtures/posts'
import Post from './'

storiesOf('UI/Post', module)
  .add('default', () => <Post data={posts[0]} />)
  .add('with single images', () => <Post data={posts[0]} />)
  .add('with multiple images', () => <Post data={posts[2]} />)
  .add('without image', () => <Post data={posts[1]} />)
