import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { Page, ScrollView, useNavigation, SCREENS } from 'navigation'
import { ProjectSuggestion, Loader, Text } from 'ui'
import { Headline, Description } from './styles'

function Suggestions() {
  const [isComplete, setIsComplete] = useState(false)
  const { data, loading } = useProjectSuggestionsQuery()
  const { navigate } = useNavigation()

  const { t } = useTranslation()

  const handleSubmit = () => {
    navigate(SCREENS.PUSH_NOTIFICATIONS)
  }

  return (
    <Page
      headerRight={
        <Text
          color="inverse"
          medium
          opacity={isComplete ? 1 : 0.5}
          disabled={!isComplete}
          onPress={handleSubmit}
        >
          {t('Suggestions:next')}
        </Text>
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
