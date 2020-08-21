import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useCurrentUserQuery, useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { request, PERMISSIONS } from 'react-native-permissions'
import { Page, ScrollView, useNavigation, AppNavigation, SCREENS } from 'navigation'
import { preSignUrl } from 'gql'
import { useToastStore } from 'store'
import { ActivityIndicator, Text, Title, Touchable, Input, Icon, KeyboardAvoidingView } from 'ui'
import { logError } from 'utils/sentry'
import { close } from 'images'
import { FILE_TYPES, TOAST_TYPES } from 'utils/enums'
import uploadAsync from 'utils/storage/uploadAsync'
import { useDynamicColor } from 'utils/hooks'
import { isIphone } from 'utils/platform'
import { Information, Row, Counter, ChangeAvatar, Overlay, CloseIcon, Location } from './styles'

const PERMISSION = isIphone ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

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
  const dynamicColor = useDynamicColor('inverse')

  const { showActionSheetWithOptions } = useActionSheet()

  const { data } = useCurrentUserQuery()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [bio, setBio] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')

  const hasErrors = firstName.length === 0 || lastName.length === 0 || username.length === 0

  const [editUser] = useEditUserMutation({
    onError: () => {
      toastActions.show({
        content: t('EditProfile:validationUsername'),
        dismissAfter: 6000,
        type: TOAST_TYPES.ERROR,
      })
    },
  })

  const toastActions = useToastStore((store) => store.actions)

  useEffect(() => {
    setAvatarUrl(data?.user?.avatarUrl)
    setBio(data?.user?.bio ?? '')
    setFirstName(data?.user?.firstName ?? '')
    setLastName(data?.user?.lastName ?? '')
    setWebsite(data?.user?.website ?? '')
    setUsername(data?.user?.username ?? '')
    setLocation(data?.user?.location ?? '')
  }, [data])

  const handleBio = useCallback(
    (text) => {
      if (text.length <= MAX_CHARACTERS) {
        setBio(text)
      }
    },
    [setBio]
  )

  const navigateToAddLocation = useCallback(() => {
    navigate(SCREENS.ADD_LOCATION, {
      locationSelectedCallback: (newLocation: string) => setLocation(newLocation),
    })
  }, [navigate])

  const handleSave = useCallback(async () => {
    setSaving(true)

    if (hasErrors) {
      toastActions.show({
        content: t('EditProfile:validation'),
        dismissAfter: 6000,
        type: TOAST_TYPES.ERROR,
      })

      return
    }

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
          setSaving(false)
          return toastActions.show({
            content: t('EditProfile:wrong'),
            dismissAfter: 6000,
            type: TOAST_TYPES.ERROR,
          })
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
      toastActions.show({
        content: t('EditProfile:wrong'),
        dismissAfter: 6000,
        type: TOAST_TYPES.ERROR,
      })

      setSaving(false)
      logError(err)
    }
  }, [dismissModal, location, bio, website, firstName, lastName, upload, avatarUrl, hasErrors])

  const handleChangeAvatar = useCallback(() => {
    const options = [
      t('EditProfile:imagePickerPhoto'),
      t('EditProfile:imagePickerLibrary'),
      t('EditProfile:remove'),
      t('EditProfile:imagePickerCancel'),
    ]

    showActionSheetWithOptions(
      {
        options,
        title: t('EditProfile:imagePickerTitle'),
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
        tintColor: dynamicColor,
      },
      async (index) => {
        if (index === 0) {
          await request(PERMISSION, {
            title: t('EditProfile:imagePickerPermissionTitle'),
            message: t('EditProfile:imagePickerPermissionText'),
            buttonNeutral: t('EditProfile:imagePickerPermissionRetry'),
            buttonPositive: t('EditProfile:imagePickerPermissionOk'),
          })

          const res = await ImagePicker.launchCameraAsync({
            aspect: [4, 4],
          })

          if (!res.cancelled) {
            setAvatarUrl(res.uri)
            const { data } = await preSignUrl({
              path: UPLOAD_PATH,
              type: FILE_TYPES.IMAGE,
            })
            setUploadFile(data.preSignUrl)
          }
        }

        if (index === 1) {
          const res = await ImagePicker.launchImageLibraryAsync()

          if (!res.cancelled) {
            setAvatarUrl(res.uri)
            const { data } = await preSignUrl({
              path: UPLOAD_PATH,
              type: FILE_TYPES.IMAGE,
            })
            setUploadFile(data.preSignUrl)
          }
        }

        if (index === 2) {
          setAvatarUrl(DEFAULT_AVATAR_URL)
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
                onChangeText={(value) => setFirstName(value)}
                defaultValue={firstName}
                error={firstName.length === 0}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:lastName')}
                onChangeText={(value) => setLastName(value)}
                defaultValue={lastName}
                error={lastName.length === 0}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:username')}
                onChangeText={(value) => setUsername(value)}
                defaultValue={username}
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
                color="accent"
                width={12}
                height={12}
                onPress={() => setLocation('')}
              />
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:bio')}
                defaultValue={bio}
                onChangeText={handleBio}
                style={{ paddingRight: 55 }}
              />
              <Counter color="accent" fontSize={15}>
                {`${bio ? bio.length : 0}/${MAX_CHARACTERS}`}
              </Counter>
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:website')}
                keyboardType="url"
                textContentType="URL"
                onChangeText={(value) => setWebsite(value)}
                defaultValue={website}
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
