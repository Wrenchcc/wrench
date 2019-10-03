import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-picker'
import { useNavigation, AppNavigation, SCREENS } from 'navigation'
import { useQuery, useMutation, preSignUrl, CURRENT_USER_QUERY, EDIT_USER_MUTATION } from 'gql'
import { useUserStore, USER } from 'store'
import { Header, Text, Title, Icon, Touchable, Avatar, Input } from 'ui'
import { logError } from 'utils/sentry'
import { close } from 'images'
import { isIphone } from 'utils/platform'
import { FILE_TYPES } from 'utils/enums'
import { Information, Row, Counter, ChangeAvatar, Overlay, CloseIcon } from './styles'
import uploadAsync from 'utils/storage/uploadAsync'
import { COLORS } from 'ui/constants'

const KEYBOARD_BEHAVIOR = isIphone && 'position'
const MAX_CHARACTERS = 100
const UPLOAD_PATH = 'avatar'

function EditProfile({ onboarding }) {
  const { t } = useTranslation()
  const { dismissModal, navigateTo } = useNavigation()
  const [upload, setUploadFile] = useState()
  const [isSaving, setSaving] = useState(false)

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

  const [editUser] = useMutation(EDIT_USER_MUTATION)

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
    navigateTo(SCREENS.ADD_LOCATION)
  }, [navigateTo])

  const handleSave = useCallback(async () => {
    setSaving(true)

    try {
      let uploadedAvatar

      if (upload) {
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
            avatarUrl: uploadedAvatar,
            firstName,
            lastName,
            location,
            bio,
            website,
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
        tintColor: 'black',
        customButtons: [{ name: 'remove', title: t('EditProfile:remove') }],
      },
      async res => {
        if (res.didCancel) {
          return
        }

        if (res.customButton) {
          update(USER.AVATAR_URL, '')
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
    <>
      <Header
        headerLeft={<Icon source={close} onPress={handleDismissModal} color="dark" />}
        headerTitle={
          <Text medium numberOfLines={1}>
            {t('EditProfile:headerTitle')}
          </Text>
        }
        headerRight={
          isSaving ? (
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
              <View
                style={{
                  flex: 1,
                  height: 60,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.ULTRA_LIGHT_GREY,
                }}
              >
                <Text
                  fontSize={17}
                  color={location ? 'dark' : 'light_grey'}
                  onPress={navigateToAddLocation}
                >
                  {location ? location : t('EditProfile:place')}
                </Text>
              </View>

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
                autoCorrect={false}
              />
            </Row>
          </Information>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default EditProfile
