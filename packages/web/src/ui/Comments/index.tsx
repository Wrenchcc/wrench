// @ts-nocheck
import React from 'react'
import List from './List'
import CommentField from '../CommentField'
import { Base } from './styles'

function Comments({ data, className }) {
  return (
    <Base className={className}>
      <CommentField />
      <List comments={data} />
    </Base>
  )
}

export default Comments
