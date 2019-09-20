import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { arrowLeft } from 'images'
import { Header, Center } from './styles'
import LocationAutocomplete from 'components/LocationAutocomplete'

function AddLocation() {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()

  const handleNavigateBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  return (
    <Header>
      <Icon source={arrowLeft} onPress={handleNavigateBack} />

      <Center>
        <LocationAutocomplete autoFocus />
      </Center>
    </Header>
  )
}

export default AddLocation
