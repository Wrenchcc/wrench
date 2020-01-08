import React from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { ProjectSuggestion, Loader } from 'ui'
import { Base, Headline, Description } from './styles'

function ProjectSuggestions() {
  const { data, isLoading } = useProjectSuggestionsQuery()
  const { t } = useTranslation()

  return (
    <Base>
      <Headline medium numberOfLines={0}>
        {t('ProjectSuggestions:headline')}
      </Headline>

      <Description color="grey" fontSize={19}>
        {t('ProjectSuggestions:description')}
      </Description>

      {isLoading && <Loader />}

      {data &&
        data.projects.length > 0 &&
        data.projects.map(({ type, edges }) => (
          <ProjectSuggestion key={type.id} title={type.title} data={edges} />
        ))}
    </Base>
  )
}

export default ProjectSuggestions
