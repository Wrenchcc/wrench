// @ts-nocheck
import React from 'react'
import List from './List'
import CommentField from 'components/CommentField'
import { Base } from './styles'

function Comments({ data, className, postId }) {
  return (
    <Base className={className}>
      <List comments={data} postId={postId} />
      <CommentField postId={postId} />
    </Base>
  )
}

export default Comments
