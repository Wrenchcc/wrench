// @ts-nocheck
import React from 'react'
import CommentField from 'components/CommentField'
import { Base, Footer } from './styles'

function Comments() {
  return (
    <Base>
      <Footer>
        <CommentField postId={'postId'} />
      </Footer>
    </Base>
  )
}

export default Comments
