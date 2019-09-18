import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { arrowLeft } from 'images'
import { Header, Center } from './styles'
import GooglePlacesAutocomplete from 'components/GooglePlacesAutocomplete'

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
        <GooglePlacesAutocomplete autoFocus keyboardAppearance="dark" />
      </Center>
    </Header>
  )
}

export default AddLocation
