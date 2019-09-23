import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RNCamera } from 'react-native-camera'
import { useNavigation } from 'navigation'
import { Header, Icon, Text } from 'ui'
import MediaPicker from 'components/MediaPicker'
import ImageEditor from 'components/ImageEditor'
import Camera from 'components/Camera'
import { arrowLeft } from 'images'
import { Base } from './styles'

const { Constants } = RNCamera

function AddAvatar() {
  const { t } = useTranslation()
  const [selectedFile, setSelected] = useState()
  const { navigateBack } = useNavigation()

  const handleNavigateBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const handleSelection = useCallback(
    item => {
      setSelected(item)
    },
    [setSelected]
  )

  const renderComponent = useCallback(() => {
    return selectedFile ? (
      <ImageEditor source={selectedFile} onChange={() => {}} />
    ) : (
      <Camera onTakePicture={() => {}} initialCameraType={Constants.Type.front} />
    )
  }, [selectedFile])

  return (
    <Base>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigateBack} color="white" />}
        color="black"
        headerRight={
          selectedFile && (
            <Text medium color="white">
              {t('AddAvatar:done')}
            </Text>
          )
        }
      />
      <MediaPicker ListHeaderComponent={renderComponent} />
    </Base>
  )
}

export default AddAvatar
