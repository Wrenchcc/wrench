import React from 'react'
import CommentField from 'components/CommentField'
import List from './List'

function Comments({ data }) {
  return (
    <>
      <List data={data} />
      <CommentField postId={data.id} />
    </>
  )
}

export default Comments
