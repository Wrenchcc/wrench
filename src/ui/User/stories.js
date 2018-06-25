import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withCenter } from 'storybook/decorators'
import User from '.'

const defaultProps = {
  data: {
    user: {
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      fullName: 'Pontus Abrahamsson',
    },
    projects: [{}],
  },
}

storiesOf('UI/User', module)
  .addDecorator(withCenter)
  .add('default', () => <User {...defaultProps} />)
