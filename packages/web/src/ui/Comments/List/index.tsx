// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Modal, useModal } from 'ui/Modal'
import Comments from 'components/Comments'
import { Row, Comment, LoadMore } from './styles'

function List({ comments, postId }) {
  const { t } = useTranslation()

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal} large>
      <Comments closeModal={closeModal} postId={postId} />
    </Modal>
  ))

  if (!comments.length) {
    return null
  }

  return (
    <>
      {comments.map(({ node }) => (
        <Row key={node.id}>
          <Link href="/[username]" as={`/${node.user.username}`}>
            <a>
              <Text bold fontSize={15}>
                {node.user.fullName}
              </Text>
            </a>
          </Link>
          <Comment fontSize={15} lineHeight={22}>
            {node.text}
          </Comment>
        </Row>
      ))}
      <span onClick={showModal}>
        <LoadMore fontSize={15} color="light_grey">
          {t('List:loadMore', {
            count: comments.totalCount,
          })}
        </LoadMore>
      </span>
    </>
  )
}

export default List
