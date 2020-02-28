import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { Page, ScrollView, AppNavigation } from 'navigation'
import { ProjectSuggestion, Loader, Text, ActivityIndicator } from 'ui'
import { Headline, Description } from './styles'

function Suggestions() {
  const [isSaving, setIsSaving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { data, loading } = useProjectSuggestionsQuery()
  const { t } = useTranslation()

  const handleSubmit = () => {
    setIsSaving(true)
    setTimeout(() => AppNavigation(), 200)
  }

  return (
    <Page
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Text
            color="inverse"
            medium
            opacity={isComplete ? 1 : 0.5}
            disabled={!isComplete}
            onPress={handleSubmit}
          >
            {t('Suggestions:next')}
          </Text>
        )
      }
    >
      <ScrollView>
        <Headline medium numberOfLines={0}>
          {t('Suggestions:headline')}
        </Headline>

        <Description color="neutral" fontSize={19}>
          {t('Suggestions:description')}
        </Description>

        {loading && <Loader />}

        {data?.projects.map(({ type, edges }) => (
          <ProjectSuggestion
            disabled
            key={type.id}
            title={type.title}
            data={edges}
            onFollow={() => setIsComplete(true)}
          />
        ))}
      </ScrollView>
    </Page>
  )
}

export default Suggestions
