import React from 'react'
import { Placeholder, PlaceholderLine, PlaceholderAnimation } from 'ui/Placeholder'
import { Base, Content } from './styles'

const styles = {
  container: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  name: {},
  projects: {},
}

export const UserPlaceholder: React.FC = () => {
  return (
    <Base>
      <Placeholder Animation={PlaceholderAnimation}>
        <PlaceholderLine noMargin style={styles.avatar} />

        <Content>
          <PlaceholderLine style={styles.name} noMargin />
          <PlaceholderLine style={styles.projects} noMargin />
        </Content>
      </Placeholder>
    </Base>
  )
}

export default UserPlaceholder
