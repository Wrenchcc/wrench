import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectSuggestionsQuery } from '@wrench/common'
import { Page, ScrollView, useNavigation, SCREENS } from 'navigation'
import { ProjectSuggestion, Text } from 'ui'
import Skeleton from './Skeleton'
import { Headline, Description } from './styles'

function Suggestions() {
  const { t } = useTranslation('suggestions')
  const [isComplete, setIsComplete] = useState(false)
  const { data, loading } = useProjectSuggestionsQuery()
  const { navigate } = useNavigation()

  const handleSubmit = () => {
    navigate(SCREENS.PUSH_NOTIFICATIONS)
  }

  const headerRight = (
    <Text
      color="inverse"
      medium
      opacity={isComplete ? 1 : 0.5}
      disabled={!isComplete}
      onPress={handleSubmit}
    >
      {t('next')}
    </Text>
  )

  return (
    <Page headerRight={headerRight}>
      <ScrollView>
        <Headline medium numberOfLines={0}>
          {t('headline')}
        </Headline>

        <Description color="neutral" fontSize={19}>
          {t('description')}
        </Description>

        {loading ? (
          <Skeleton />
        ) : (
          data?.projects.map(({ type, edges }) => (
            <ProjectSuggestion
              disabled
              key={type.id}
              title={type.title}
              data={edges}
              onFollow={() => setIsComplete(true)}
            />
          ))
        )}
      </ScrollView>
    </Page>
  )
}

export default Suggestions
