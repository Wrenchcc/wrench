import React from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { ProjectSuggestion, Loader, Title, Text } from 'ui'

const styles = {
  headline: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 40,
  },
}

function ProjectSuggestions() {
  const { data, loading } = useProjectSuggestionsQuery()
  const { t } = useTranslation('project-suggestions')

  return (
    <>
      <Title medium numberOfLines={0} style={styles.headline}>
        {t('title')}
      </Title>

      <Text color="neutral" fontSize={19} style={styles.description}>
        {t('description')}
      </Text>

      {loading && <Loader />}

      {data?.projects.length > 0 &&
        data.projects.map(({ type, edges }) => (
          <ProjectSuggestion key={type.id} title={type.title} data={edges} />
        ))}
    </>
  )
}

export default ProjectSuggestions
