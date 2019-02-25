import React, { memo } from 'react'
import List from './List'
import CommentField from '../CommentField'
import { Base } from './styles'

const Comments = memo(function Comments({ data, className }) {
  return (
    <Base className={className}>
      <CommentField />
      <List comments={data} />
    </Base>
  )
})

export default Comments
