import React, { memo } from 'react'
import Text from '../../Text'
import { Row, Comment } from './styles'

const List = memo(function List({ comments, className }) {
  return comments.map(({ node }) => (
    <Row key={node.id}>
      <Text bold fontSize={15}>
        {`${node.user.fullName}`}
      </Text>
      <Comment fontSize={15} lineHeight={22}>
        {node.text}
      </Comment>
    </Row>
  ))
})

export default List
