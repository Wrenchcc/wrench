import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useCurrentUserQuery, useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-picker'
import { useColorScheme } from 'react-native-appearance'
import { Page, ScrollView, useNavigation, AppNavigation, SCREENS } from 'navigation'
import { preSignUrl } from 'gql'
import { useUserStore, USER } from 'store'
import { ActivityIndicator, Text, Title, Touchable, Input, Icon, KeyboardAvoidingView } from 'ui'
import { logError } from 'utils/sentry'
import { close } from 'images'
import { FILE_TYPES } from 'utils/enums'
import uploadAsync from 'utils/storage/uploadAsync'
import { Information, Row, Counter, ChangeAvatar, Overlay, CloseIcon, Location } from './styles'

const CDN_DOMAIN = 'https://edge-files.wrench.cc'
const DEFAULT_AVATAR_URL = 'https://edge-files.wrench.cc/avatar/default.jpg'
const DEFAULT_AVATAR = 'default.jpg'
const MAX_CHARACTERS = 100
const UPLOAD_PATH = 'avatar'

function EditProfile({ onboarding }) {
  const { t } = useTranslation()
  const { dismissModal, navigate } = useNavigation()
  const [upload, setUploadFile] = useState()
  const [isSaving, setSaving] = useState(false)
  const colorScheme = useColorScheme()

  const { data } = useCurrentUserQuery()

  const {
    update,
    initialState,
    avatarUrl,
    location,
    bio,
    firstName,
    lastName,
    website,
    username,
  } = useUserStore(store => ({
    initialState: store.actions.initialState,
    update: store.actions.update,
    avatarUrl: store.avatarUrl,
    firstName: store.firstName,
    lastName: store.lastName,
    location: store.location,
    bio: store.bio,
    website: store.website,
    username: store.username,
  }))

  const hasErrors = firstName.length === 0 || lastName.length === 0 || username.length === 0

  const [editUser] = useEditUserMutation()

  useEffect(() => {
    initialState(data?.user)
  }, [initialState, data])

  const handleBio = useCallback(
    text => {
      if (text.length <= MAX_CHARACTERS) {
        update(USER.BIO, text)
      }
    },
    [update]
  )

  const navigateToAddLocation = useCallback(() => {
    navigate(SCREENS.ADD_LOCATION)
  }, [navigate])

  const handleSave = useCallback(async () => {
    setSaving(true)

    try {
      // NOTE: Get filename from saved avatarUrl to submit to backend
      let uploadedAvatar = avatarUrl.replace(`${CDN_DOMAIN}/avatar/`, '')

      if (upload && uploadedAvatar !== DEFAULT_AVATAR) {
        try {
          await uploadAsync(upload.url, {
            uri: avatarUrl,
            type: upload.type,
          })

          uploadedAvatar = upload.filename
        } catch (err) {
          logError(err)
        }
      }

      await editUser({
        variables: {
          input: {
            avatarUrl: uploadedAvatar === DEFAULT_AVATAR ? '' : uploadedAvatar,
            firstName,
            lastName,
            location,
            bio,
            website,
            username,
          },
        },
      })

      setSaving(false)

      if (onboarding) {
        AppNavigation()
      } else {
        dismissModal()
      }
    } catch (err) {
      setSaving(false)
      logError(err)
    }
  }, [dismissModal, location, bio, website, firstName, lastName, upload, avatarUrl])

  const handleChangeAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: t('EditProfile:imagePickerTitle'),
        cancelButtonTitle: t('EditProfile:imagePickerCancel'),
        takePhotoButtonTitle: t('EditProfile:imagePickerPhoto'),
        chooseFromLibraryButtonTitle: t('EditProfile:imagePickerLibrary'),
        mediaType: 'photo',
        permissionDenied: {
          title: t('EditProfile:imagePickerPermissionTitle'),
          text: t('EditProfile:imagePickerPermissionText'),
          reTryTitle: t('EditProfile:imagePickerPermissionRetry'),
          okTitle: t('EditProfile:imagePickerPermissionOk'),
        },
        tintColor: colorScheme === 'dark' ? 'white' : 'black',
        customButtons: [{ name: 'remove', title: t('EditProfile:remove') }],
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        },
      },
      async res => {
        if (res.didCancel) {
          return
        }

        if (res.customButton) {
          update(USER.AVATAR_URL, DEFAULT_AVATAR_URL)
        } else {
          update(USER.AVATAR_URL, res.uri)
          const { data } = await preSignUrl({
            path: UPLOAD_PATH,
            type: FILE_TYPES.IMAGE,
          })

          setUploadFile(data.preSignUrl)
        }
      }
    )
  }, [])

  return (
    <Page
      headerTitle={t('EditProfile:headerTitle')}
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Touchable onPress={handleSave} disabled={hasErrors}>
            <Text medium opacity={hasErrors ? 0.5 : 1}>
              {t('EditProfile:save')}
            </Text>
          </Touchable>
        )
      }
      headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
      view
      headerAnimation={false}
    >
      <KeyboardAvoidingView paddingHorizontal={0}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
          keyboardDismissMode="on-drag"
        >
          <ChangeAvatar>
            {/* NOTE: Use image Avatar can't handle file:// Android format */}
            <Image
              style={{ width: 120, height: 120, borderRadius: 120 }}
              source={{
                uri: avatarUrl,
              }}
            />
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
                error={firstName.length === 0}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:lastName')}
                onChangeText={value => update(USER.LAST_NAME, value)}
                value={lastName}
                error={lastName.length === 0}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:username')}
                onChangeText={value => update(USER.USERNAME, value)}
                value={username}
                error={username.length === 0}
              />
            </Row>

            <Row>
              <Location>
                <Text
                  fontSize={17}
                  color={location ? 'dark' : 'light_grey'}
                  onPress={navigateToAddLocation}
                  numberOfLines={1}
                >
                  {location ? location : t('EditProfile:place')}
                </Text>
              </Location>

              <CloseIcon
                source={close}
                color="subtle"
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
              <Counter color="subtle" fontSize={15}>
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
                autoCorrect={false}
              />
            </Row>
          </Information>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  )
}

export default EditProfile
