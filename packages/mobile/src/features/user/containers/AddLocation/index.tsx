import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Input, Header, Icon } from 'ui'
import { arrowLeft } from 'images'

function AddLocation() {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()

  const handleNavigateBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  return (
    <Header
      headerLeft={<Icon source={arrowLeft} onPress={handleNavigateBack} />}
      headerTitle={
        <Input color="dark" placeholder="Search location" autoFocus style={{ marginLeft: 20 }} />
      }
    />
  )
}

export default AddLocation
