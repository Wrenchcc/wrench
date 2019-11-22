// @ts-nocheck
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Text } from 'ui'
import { List, Title } from './styles'

function Popular({ projects }) {
  const { t } = useTranslation()

  return (
    <Fragment>
      <Title medium>{t('Popular:title')}</Title>
      <Text color="grey">{t('Popular:description')}</Text>

      <List>
        {projects &&
          projects.edges.map(({ node }) => (
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
