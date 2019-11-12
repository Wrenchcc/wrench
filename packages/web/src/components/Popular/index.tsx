// @ts-nocheck
import React, { Fragment } from 'react'
import { pathOr } from 'ramda'
import { useTranslation } from 'react-i18next'
import { Card, Text } from '../../ui'
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
              image={pathOr(null, ['files', 'edges', [0], 'node', 'uri'], node)}
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
