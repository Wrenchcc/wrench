import React, { useCallback } from 'react'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { arrowLeft } from 'images'
import SearchLocation from 'components/SearchLocation'
import { useUserStore } from 'store'

function AddLocation() {
  const { navigateBack } = useNavigation()

  const { update } = useUserStore(store => ({
    update: store.actions.update,
  }))

  const handleNavigateBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const handleSelection = useCallback(
    location => {
      update('location', location.place_name)
      navigateBack()
    },
    [navigateBack, update]
  )

  return (
    <SearchLocation
      autoFocus
      iconLeft={<Icon source={arrowLeft} onPress={handleNavigateBack} />}
      onPress={handleSelection}
    />
  )
}

export default AddLocation
