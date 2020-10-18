import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useProjectTypesQuery } from '@wrench/common'
import { Text } from 'ui'
import { Base, Wrapper } from './styles'

function ProjectTypes({ selectedId }) {
  const { t } = useTranslation()
  const { data, loading } = useProjectTypesQuery()

  if (loading) {
    return null
  }

  return (
    <Base>
      {/* <Wrapper first>
        <Text fontSize={15} medium>
          {t('ProjectTypes:inspo')}
        </Text>
      </Wrapper> */}

      {data.types.map((category) => (
        <Link key={category.id} href="/explore/[id]" as={`/explore/${category.id}`}>
          <Wrapper selected={category.id === selectedId} href="/">
            <Text fontSize={15} medium>
              {category.title}
            </Text>
          </Wrapper>
        </Link>
      ))}
    </Base>
  )
}

export default ProjectTypes
