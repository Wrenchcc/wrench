import React from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { ProjectSuggestion, Loader } from 'ui'
import { Base, Headline, Description } from './styles'

function ProjectSuggestions() {
  const { data, loading } = useProjectSuggestionsQuery()
  const { t } = useTranslation('project-suggestions')

  return (
    <Base>
      <Headline medium numberOfLines={0}>
        {t('title')}
      </Headline>

      <Description color="neutral" fontSize={19}>
        {t('description')}
      </Description>

      {loading && <Loader />}

      {data?.projects.length > 0 &&
        data.projects.map(({ type, edges }) => (
          <ProjectSuggestion key={type.id} title={type.title} data={edges} />
        ))}
    </Base>
  )
}

export default ProjectSuggestions
