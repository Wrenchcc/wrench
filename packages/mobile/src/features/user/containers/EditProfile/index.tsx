import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-picker'
import { useNavigation, SCREENS } from 'navigation'
import { useQuery, useMutation, CURRENT_USER_QUERY, EDIT_USER_MUTATION } from 'gql'
import { useUserStore, USER } from 'store'
import { Header, Text, Title, Icon, Touchable, Avatar, Input } from 'ui'
import { logError } from 'utils/sentry'
import { close } from 'images'
import { isIphone } from 'utils/platform'
import { Information, Row, Counter, ChangeAvatar, Overlay, CloseIcon } from './styles'
// import { preSignUrl } from 'src/gql'

const KEYBOARD_BEHAVIOR = isIphone && 'position'
const MAX_CHARACTERS = 100

function EditProfile() {
  const { t } = useTranslation()
  const { dismissModal, navigateTo } = useNavigation()
  const [uploadUrl, setUploadUrl] = useState()

  const { data } = useQuery(CURRENT_USER_QUERY)

  const {
    update,
    initialState,
    avatarUrl,
    location,
    bio,
    firstName,
    lastName,
    website,
  } = useUserStore(store => ({
    initialState: store.actions.initialState,
    update: store.actions.update,
    avatarUrl: store.avatarUrl,
    firstName: store.firstName,
    lastName: store.lastName,
    location: store.location,
    bio: store.bio,
    website: store.website,
  }))

  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION)

  useEffect(() => {
    initialState(data.user)
  }, [initialState, data])

  const handleBio = useCallback(
    text => {
      if (text.length <= MAX_CHARACTERS) {
        update(USER.BIO, text)
      }
    },
    [update]
  )

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [dismissModal])

  const navigateToAddLocation = useCallback(() => {
    navigateTo(SCREENS.ADD_LOCATION, {
      options: {
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    })
  }, [navigateTo])

  const handleSave = useCallback(async () => {
    try {
      let avatarUrl

      if (uploadUrl) {
        // Upload avatar
        avatarUrl = null
      }

      await editUser({
        variables: {
          input: {
            avatarUrl,
            firstName,
            lastName,
            location,
            bio,
            website,
          },
        },
      })

      dismissModal()
    } catch (err) {
      logError(err)
    }
  }, [dismissModal, location, bio, website, firstName, lastName, uploadUrl])

  const handleChangeAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: t('EditProfile:imagePickerTitle'), // 'Select Avatar'
        cancelButtonTitle: t('EditProfile:imagePickerCancel'), // 'Cancel',
        takePhotoButtonTitle: t('EditProfile:imagePickerPhoto'), // 'Take Photo…',
        chooseFromLibraryButtonTitle: t('EditProfile:imagePickerLibrary'), // 'Choose from Library…',
        mediaType: 'photo',
        permissionDenied: {
          title: t('EditProfile:imagePickerPermissionTitle'), // 'Permission denied',
          text: t('EditProfile:imagePickerPermissionText'), // 'To be able to take pictures with your camera and choose images from your library.',
          reTryTitle: t('EditProfile:imagePickerPermissionRetry'), // 're-try',
          okTitle: t('EditProfile:imagePickerPermissionOk'), // "I'm sure",
        },
        tintColor: 'black',
      },
      async res => {
        if (res.uri) {
          // const url = await preSignUrl()
          // setUploadUrl(url)
          update(USER.AVATAR_URL, res.uri)
        }
      }
    )
  }, [])

  return (
    <>
      <Header
        headerLeft={<Icon source={close} onPress={handleDismissModal} color="dark" />}
        headerTitle={
          <Text medium numberOfLines={1}>
            {t('EditProfile:headerTitle')}
          </Text>
        }
        headerRight={
          loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Touchable onPress={handleSave}>
              <Text medium>{t('EditProfile:save')}</Text>
            </Touchable>
          )
        }
      />
      <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 45 }}
          keyboardDismissMode="on-drag"
        >
          <ChangeAvatar>
            <Avatar uri={avatarUrl} size={120} />
            <Overlay onPress={handleChangeAvatar} activeOpacity={1}>
              <Text color="white" medium fontSize={15}>
                {t('EditProfile:change')}
              </Text>
            </Overlay>
          </ChangeAvatar>

          <Information>
            <Title>{t('EditProfile:information')}</Title>

            <Row first>
              <Input
                color="dark"
                placeholder={t('EditProfile:firstName')}
                onChangeText={value => update(USER.FIRST_NAME, value)}
                value={firstName}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:lastName')}
                onChangeText={value => update(USER.LAST_NAME, value)}
                value={lastName}
              />
            </Row>

            <Row>
              <Touchable onPress={navigateToAddLocation} nativeHandler>
                <Input
                  color="dark"
                  placeholder={t('EditProfile:place')}
                  editable={false}
                  textContentType="location"
                  value={location}
                />
              </Touchable>

              <CloseIcon
                source={close}
                color="light_grey"
                width={12}
                height={12}
                onPress={() => update(USER.LOCATION, '')}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:bio')}
                value={bio}
                onChangeText={handleBio}
                style={{ paddingRight: 55 }}
              />
              <Counter color="light_grey" fontSize={15}>
                {`${bio ? bio.length : 0}/${MAX_CHARACTERS}`}
              </Counter>
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:website')}
                keyboardType="url"
                textContentType="URL"
                onChangeText={value => update(USER.WEBSITE, value)}
                value={website}
              />
            </Row>
          </Information>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default EditProfile
