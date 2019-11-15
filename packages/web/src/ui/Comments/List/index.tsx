// @ts-nocheck
import React, { memo, Fragment } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Text from '../../Text'
import { Row, Comment, LoadMore } from './styles'

const List = memo(function List({ comments }) {
  const { t } = useTranslation()

  if (!comments.length) {
    return null
  }

  return (
    <Fragment>
      {comments.map(({ node }) => (
        <Row key={node.id}>
          <Link href="/[username]" as={`/${node.user.username}`}>
            <a>
              <Text bold fontSize={15}>
                {`${node.user.fullName}`}
              </Text>
            </a>
          </Link>
          <Comment fontSize={15} lineHeight={22}>
            {node.text}
          </Comment>
        </Row>
      ))}
      <LoadMore fontSize={15} color="light_grey">
        {t('List:loadMore', {
          count: comments.totalCount,
        })}
      </LoadMore>
    </Fragment>
  )
})

export default List
