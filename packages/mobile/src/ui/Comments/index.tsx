import React from 'react'
import CommentField from 'components/CommentField'
import List from './List'

function Comments({ data }) {
  return (
    <>
      <CommentField postId={data.id} />
      <List data={data} />
    </>
  )
}

export default Comments
