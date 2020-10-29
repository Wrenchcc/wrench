// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useProjectTypesQuery } from '@wrench/common'
import { Text } from 'ui'
import { Base, Wrapper } from './styles'

function ProjectTypes({ selectedId }) {
  const { data, loading } = useProjectTypesQuery()

  if (loading) {
    return null
  }

  return (
    <Base>
      {/* <Wrapper first>
        <Text fontSize={15} medium>
          {t('inspo')}
        </Text>
      </Wrapper> */}

      {data.types.map((category) => (
        <Link key={category.id} href={`/explore/${category.id}`}>
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
