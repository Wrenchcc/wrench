import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../Text'

const MAX_TEXT = 120

function ExpandableText({ text }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [setExpanded, expanded])

  if (expanded) {
    return text
  }

  if (text && text.length > MAX_TEXT) {
    return (
      <>
        {`${text.substring(0, MAX_TEXT).trim()}... `}
        <Text onPress={toggleExpanded} fontSize={15} medium>
          {t('ExpandableText:more')}
        </Text>
      </>
    )
  }

  return text
}

export default ExpandableText
