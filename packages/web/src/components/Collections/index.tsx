// @ts-nocheck
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { Text } from 'ui'
import { Base, Inner, Item, Name, Cover } from './styles'
import { useTranslation } from 'i18n'

function Collection() {
  const { t } = useTranslation('collections')
  const router = useRouter()
  const { collection, slug } = router.query

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
            <Link key={node.id} href={`/project/${slug}/collection/${node.slug}`}>
              <Item>
                <Cover
                  selected={node.slug === collection}
                  source={node.cover.uri}
                  width={60}
                  height={60}
                  borderRadius={60}
                />
                <Name fontSize={12}>{node.name}</Name>
              </Item>
            </Link>
          )
        })}
      </Inner>
    </Base>
  )
}

export default Collection
