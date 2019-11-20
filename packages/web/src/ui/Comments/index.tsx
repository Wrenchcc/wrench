// @ts-nocheck
import React from 'react'
import List from './List'
import CommentField from 'components/CommentField'
import { Base } from './styles'

function Comments({ data, postId, className }) {
  return (
    <Base className={className}>
      <List data={data} postId={postId} />
      <CommentField postId={postId} />
    </Base>
  )
}

export default Comments
