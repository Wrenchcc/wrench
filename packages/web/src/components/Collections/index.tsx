// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { Text } from 'ui'
import { useTranslation } from 'i18n'
import { Base, Inner, Item, Name, Cover } from './styles'

function Collection({ slug, collection }) {
  const { t } = useTranslation('collections')

  const {
    data: { edges },
  } = usePaginatedQuery(['projectCollections'])(ProjectCollectionsDocument, {
    variables: {
      projectSlug: slug,
      first: 6,
    },
  })

  if (!edges?.length) {
    return null
  }

  return (
    <Base>
      <Text medium>{t('title')}</Text>

      <Inner>
        {edges?.map(({ node }) => {
          return (
            <Link
              key={node.id}
              href={
                node.slug === collection
                  ? `/project/${slug}`
                  : `/project/${slug}/collection/${node.slug}`
              }
            >
              <Item>
                <Cover
                  selected={node.slug === collection}
                  source={node.cover.uri}
                  width={60}
                  height={60}
                  borderRadius={60}
                />
                <Name fontSize={12} center>
                  {node.name}
                </Name>
              </Item>
            </Link>
          )
        })}
      </Inner>
    </Base>
  )
}

export default Collection
