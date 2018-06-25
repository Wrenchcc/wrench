import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withBasePadding } from 'storybook/decorators'
import ProjectCard from '.'

const image = () => ({
  uri: `https://scontent-arn2-1.cdninstagram.com/vp/3bbd5a6e41c9d12ae0a22fa4dc019951/5BC2DC37/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/30079353_2101041190141113_2099464732514713600_n.jpg?${Math.floor(
    Math.random() * (100 - 0 + 1)
  )}`,
})

const defaultProps = {
  name: 'The Natural',
  followers: 1000,
  onPress: () => {},
  user: {
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
}

storiesOf('UI/ProjectCard', module)
  .addDecorator(withBasePadding)
  .add('One image', () => <ProjectCard {...defaultProps} images={[image()]} />)
  .add('Two image', () => <ProjectCard {...defaultProps} images={[image(), image()]} />)
  .add('Three image', () => <ProjectCard {...defaultProps} images={[image(), image(), image()]} />)
  .add('Four image', () => (
    <ProjectCard {...defaultProps} images={[image(), image(), image(), image()]} />
  ))
  .add('Five image', () => (
    <ProjectCard {...defaultProps} images={[image(), image(), image(), image(), image()]} />
  ))
  .add('Six image', () => (
    <ProjectCard
      {...defaultProps}
      images={[image(), image(), image(), image(), image(), image()]}
    />
  ))
