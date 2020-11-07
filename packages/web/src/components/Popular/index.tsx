// @ts-nocheck
import React, { Fragment } from 'react'
import { useTranslation } from 'i18n'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Card, Text } from 'ui'
import { List, Title } from './styles'
import Placeholder from 'ui/Card/Placeholder'

function Popular() {
  const { t } = useTranslation('popular')
  let content 

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


  if(isFetching) {
    content = new Array(8).fill({}).map((_, index) => (<Placeholder />))
   } else {
     content = edges?.map(({ node }) => (
      <Card
        key={node.id}
        image={node.cover.uri}
        title={node.title}
        slug={node.slug}
        user={node.user}
      />
    ))
   }
 

  return (
    <Fragment>
      <Title medium>{t('title')}</Title>
      <Text color="neutral">{t('description')}</Text>

      <List>
        {content}
      </List>
    </Fragment>
  )
}

export default Popular
