import React from 'react'
import { Page, useNavigation } from 'navigation'
import { Icon } from 'ui'
import { close } from 'images'

function Bookmarks() {
  const { dismissModal } = useNavigation()

  return (
    <Page
      headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
      headerTitle="Saved posts"
      view
      headerAnimation={false}
    ></Page>
  )
}

export default Bookmarks
