import React, { useState, useCallback } from 'react'
import { useAddCollectionMutation } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { keyboardHeight } from 'utils/platform'
import { Icon, Input, Title } from 'ui'
import { Base, Center, Text, Content } from './styles'
import { add } from 'images'

const HALFPANEL_HEIGHT = 164

function AddCollection({ projectId, style = {} }) {
  const [, setName] = useState('')
  const { showHalfpanel, dismissHalfpanel, showModal } = useNavigation()
  const [addCollection] = useAddCollectionMutation()

  const handleHalfPanel = useCallback(
    () =>
      showHalfpanel({
        height: HALFPANEL_HEIGHT + keyboardHeight,
        renderContent: () => (
          <Content>
            <Title>New Collection</Title>
            <Input
              placeholder="Ex. Bodywork"
              enablesReturnKeyAutomatically
              autoFocus
              returnKeyType="done"
              onChangeText={setName}
              onSubmitEditing={async ({ nativeEvent }) => {
                dismissHalfpanel()

                const { data } = await addCollection({
                  variables: {
                    name: nativeEvent.text,
                    projectId,
                  },
                })

                showModal(SCREENS.ADD_POST_TO_COLLECTION, {
                  collectionId: data.addCollection.id,
                  projectId,
                })
              }}
            />
          </Content>
        ),
      }),
    [showHalfpanel, addCollection, projectId]
  )

  return (
    <Base style={style}>
      <Center>
        <Icon source={add} onPress={handleHalfPanel} />
      </Center>
      <Text fontSize={12}>Add new</Text>
    </Base>
  )
}

export default AddCollection
