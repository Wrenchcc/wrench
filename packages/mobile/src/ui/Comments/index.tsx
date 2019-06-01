import React, { Fragment } from 'react'
import CommentField from 'components/CommentField'
import List from './List'

function Comments({ data }) {
  return (
    <Fragment>
      <CommentField postId={data.id} />
      <List data={data} />
    </Fragment>
  )
}

export default Comments
