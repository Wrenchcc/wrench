// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'i18n'
import Text from 'ui/Text'
import { Modal, useModal } from 'ui/Modal'
import Comments from 'components/Comments'
import { Row, Comment, LoadMore } from './styles'

function List({ data, postId }) {
  const { t } = useTranslation('List')

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal} large>
      <Comments closeModal={closeModal} postId={postId} />
    </Modal>
  ))

  if (!data.comments.edges.length) {
    return null
  }

  return (
    <>
      {data.comments.edges.map(({ node }) => (
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
        <LoadMore fontSize={15} color="neutral">
          {t('loadMore', {
            count: data.comments.totalCount,
          })}
        </LoadMore>
      </span>
    </>
  )
}

export default List
