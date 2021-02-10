import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base } from './styles'
import { TOAST_TYPES } from 'utils/enums'

function Toast({ content, type }: { content: string; type?: TOAST_TYPES }) {
  const { t } = useTranslation('toast')

  const renderContent = useCallback(() => {
    switch (type) {
      case TOAST_TYPES.NETWORK:
        return t('network')
      case TOAST_TYPES.SPAM:
        return t('spam')
      default:
        return content
    }
  }, [t, type, content])

  return (
    <Base type={type}>
      <Text color="white" medium center fontSize={15}>
        {content || renderContent()}
      </Text>
    </Base>
  )
}

export default Toast
