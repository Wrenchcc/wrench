import React from 'react'
import MediaLibrary from 'components/MediaLibrary'
// import React, { useCallback, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useReactiveVar } from '@apollo/client'
// import { useActionSheet } from '@expo/react-native-action-sheet'
// import { store } from 'gql'
// import { useNavigation, SCREENS } from 'navigation'
// import { ActivityIndicator, Header, Text, Icon, Touchable } from 'ui'
// import cropImage from 'utils/cropImage'
// import { useDynamicColor } from 'utils/hooks'
// import { close } from 'images'
// import { logError } from 'utils/sentry'
// import Camera from 'components/Camera'
// import ImageEditor from 'components/ImageEditor'
// import MediaPicker from 'components/MediaPicker'
// import SelectProject from '../../components/SelectProject'
// import { Base } from './styles'

function AddMedia({ id }) {
  // const { t } = useTranslation('add-media')
  // const { navigate, dismissModal } = useNavigation()
  // const [isLoading, setLoading] = useState(false)
  // const { showActionSheetWithOptions } = useActionSheet()
  // const dynamicColor = useDynamicColor('inverse')
  // const dynamicBackgroundColor = useDynamicColor('default')
  // const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  // const selectedFileId = useReactiveVar(store.files.selectedFileIdVar)
  // const selectedFile = selectedFiles.find(({ id }) => id === selectedFileId)
  // const handleCropping = useCallback(async () => {
  //   setLoading(true)
  //   try {
  //     const files = await Promise.all(selectedFiles.map(cropImage))
  //     store.files.add(files)
  //   } catch (err) {
  //     logError(err)
  //   }
  //   setLoading(false)
  //   navigate(SCREENS.ADD_POST, {
  //     options: {
  //       animations: {
  //         push: {
  //           waitForRender: true,
  //         },
  //       },
  //     },
  //   })
  // }, [selectedFileId, navigate])
  // const handleDismissModal = useCallback(() => {
  //   if (selectedFiles.length > 0) {
  //     showActionSheetWithOptions(
  //       {
  //         title: t('options.title'),
  //         options: [t('options.discard'), t('options.cancel')],
  //         destructiveButtonIndex: 0,
  //         cancelButtonIndex: 1,
  //         tintColor: dynamicColor,
  //         containerStyle: {
  //           backgroundColor: dynamicBackgroundColor,
  //         },
  //       },
  //       (index) => {
  //         if (index === 0) {
  //           dismissModal()
  //           store.files.reset()
  //           store.post.captionVar('')
  //           store.collection.collectionVar('')
  //         }
  //       }
  //     )
  //   } else {
  //     dismissModal()
  //   }
  // }, [showActionSheetWithOptions, dismissModal])
  // const renderComponent = useCallback(() => {
  //   return selectedFile ? (
  //     <ImageEditor source={selectedFile} onChange={store.files.edit} />
  //   ) : (
  //     <Camera onTakePicture={store.files.select} />
  //   )
  // }, [selectedFile])
  // return (
  //   <Base>
  //     <Header
  //       headerLeft={<Icon source={close} onPress={handleDismissModal} color="white" />}
  //       headerRight={
  //         isLoading ? (
  //           <ActivityIndicator color="white" />
  //         ) : selectedFiles.length > 0 ? (
  //           <Touchable onPress={handleCropping}>
  //             <Text color="white" medium>
  //               {t('next')}
  //             </Text>
  //           </Touchable>
  //         ) : null
  //       }
  //       color="black"
  //     />
  //     <SelectProject selectedId={id} />
  //     <MediaPicker ListHeaderComponent={renderComponent} />
  //   </Base>
  // )

  return <MediaLibrary />
}

export default AddMedia
