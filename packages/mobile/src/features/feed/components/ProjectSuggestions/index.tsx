import React from 'react'
import { useTranslation } from 'react-i18next'
import { getProjectSuggestions } from 'graphql/queries/project/getProjectSuggestions'
import { ProjectSuggestion, Loader } from 'ui'
import { Base, Headline, Description } from './styles'

function ProjectSuggestions({ projects, isFetching }) {
  const { t } = useTranslation()

  return (
    <Base>
      <Headline medium numberOfLines={0}>
        {t('ProjectSuggestions:headline')}
      </Headline>

      <Description color="grey" fontSize={19}>
        {t('ProjectSuggestions:description')}
      </Description>

      {isFetching && <Loader />}
      {projects.length > 0
        && projects.map(({ type, edges }) => (
          <ProjectSuggestion key={type.id} title={type.title} data={edges} />
        ))}
    </Base>
  )
}

export default getProjectSuggestions(ProjectSuggestions)
