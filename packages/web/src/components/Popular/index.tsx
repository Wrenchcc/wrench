// @ts-nocheck
import React, { Fragment } from 'react'
import { useTranslation } from 'i18n'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Card, Text } from 'ui'
import { List, Title } from './styles'

function Popular() {
  const { t } = useTranslation('popular')

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      type: 'POPULAR',
      first: 8,
    },
  })

  return (
    <Fragment>
      <Title medium>{t('TITLE')}</Title>
      <Text color="neutral">{t('DESCRIPTION')}</Text>

      <List>
        {edges?.map(({ node }) => (
          <Card
            key={node.id}
            image={node.cover.uri}
            title={node.title}
            slug={node.slug}
            user={node.user}
          />
        ))}
      </List>
    </Fragment>
  )
}

export default Popular
