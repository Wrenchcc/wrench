import React, { useCallback } from 'react'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { arrowLeft } from 'images'
import SearchLocation from 'components/SearchLocation'

function AddLocation({ locationSelectedCallback }) {
  const { navigateBack } = useNavigation()

  const handleNavigateBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const handleSelection = useCallback(
    (location) => {
      locationSelectedCallback(location.place_name)
      navigateBack()
    },
    [navigateBack]
  )

  return (
    <SearchLocation
      iconLeft={<Icon source={arrowLeft} onPress={handleNavigateBack} />}
      onPress={handleSelection}
    />
  )
}

export default AddLocation
