import React from 'react'
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import { PlaceholderAnimation } from 'ui'
import { Base } from './styles'

export const PostPlaceholder: React.FC = () => {
  return (
    <Base>
      <Placeholder Animation={PlaceholderAnimation}>
        <Placeholder
          Left={props => (
            <PlaceholderMedia isRound={true} style={[{ backgroundColor: 'green' }, props.style]} />
          )}
          Right={PlaceholderMedia}
        >
          <PlaceholderLine noMargin style={styles.image} />
          <PlaceholderLine style={styles.projectName} noMargin width={90} />
          <PlaceholderLine style={styles.projectName} noMargin width={60} />
        </Placeholder>
      </Placeholder>
    </Base>
  )
}

const styles = {
  container: {
    marginRight: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 0,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
  projectName: {
    borderRadius: 0,
    marginTop: 10,
    marginBottom: 5,
  },
}

export default PostPlaceholder
