import React, { useCallback, useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { useCurrentUserQuery, useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Page, ScrollView, useNavigation, AppNavigation, SCREENS } from 'navigation'
import { preSignUrl } from 'gql'
import { TOAST_TYPES } from 'utils/enums'
import { showToast } from 'navigation/banner'
import * as Spacing from 'ui/Spacing'
import { ActivityIndicator, Text, Title, Touchable, Input, Icon } from 'ui'
import { logError } from 'utils/sentry'
import { close } from 'images'
import { FILE_TYPES } from 'utils/enums'
import uploadAsync from 'utils/storage/uploadAsync'
import { useDynamicColor } from 'utils/hooks'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  information: {
    marginTop: 50,
  },
  change: {
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    borderRadius: 60,
    backgroundColor: 'rgba(000, 000, 000, 0.3)',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 22,
  },
  location: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingRight: 30,
    borderBottomColor: PlatformColor.divider,
  },
}

const CDN_DOMAIN = 'https://edge-files.wrench.cc'
const DEFAULT_AVATAR_URL = 'https://edge-files.wrench.cc/avatar/default.jpg'
const DEFAULT_AVATAR = 'default.jpg'
const MAX_CHARACTERS = 100
const UPLOAD_PATH = 'avatar'

function EditProfile({ onboarding }) {
  const { t } = useTranslation('edit-profile')
  const { dismissModal, navigate } = useNavigation()
  const [upload, setUploadFile] = useState()
  const [isSaving, setSaving] = useState(false)
  const dynamicColor = useDynamicColor('inverse')
  const dynamicBackgroundColor = useDynamicColor('default')

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
      showToast({
        content: t('validationUsername'),
        type: TOAST_TYPES.ERROR,
      })
    },
  })

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
      showToast({
        content: t('validation'),
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

          return showToast({
            content: t('wrong'),
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
        await AppNavigation()
      } else {
        dismissModal()
      }
    } catch (err) {
      showToast({
        content: t('wrong'),
        type: TOAST_TYPES.ERROR,
      })

      setSaving(false)
      logError(err)
    }
  }, [dismissModal, location, bio, website, firstName, lastName, upload, avatarUrl, hasErrors])

  const handleChangeAvatar = useCallback(() => {
    const options = [
      t('imagePickerPhoto'),
      t('imagePickerLibrary'),
      t('remove'),
      t('imagePickerCancel'),
    ]

    showActionSheetWithOptions(
      {
        options,
        title: t('imagePickerTitle'),
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
        titleTextStyle: {
          color: dynamicColor,
          fontWeight: '500',
        },
        tintColor: dynamicColor,
        containerStyle: {
          backgroundColor: dynamicBackgroundColor,
        },
      },
      async (index) => {
        if (index === 0) {
          const status = await ImagePicker.requestCameraPermissionsAsync()

          if (status?.granted) {
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
      headerTitle={t('headerTitle')}
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Touchable onPress={handleSave} disabled={hasErrors}>
            <Text medium opacity={hasErrors ? 0.5 : 1}>
              {t('save')}
            </Text>
          </Touchable>
        )
      }
      headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
      disableAnimation
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        keyboardDismissMode="on-drag"
      >
        <View style={styles.change}>
          {/* NOTE: Use image Avatar can't handle file:// Android format */}
          <Image
            fadeDuration={0}
            style={{ width: 120, height: 120, borderRadius: 120 }}
            source={{
              uri: avatarUrl,
            }}
          />
          <Touchable onPress={handleChangeAvatar} style={styles.overlay}>
            <Text color="white" medium fontSize={15}>
              {t('change')}
            </Text>
          </Touchable>
        </View>

        <View style={styles.information}>
          <Title>{t('information')}</Title>

          <Spacing.Horizontally px={30} />

          <Input
            color="dark"
            placeholder={t('firstName')}
            onChangeText={(value) => setFirstName(value)}
            defaultValue={firstName}
            error={firstName.length === 0}
          />

          <Input
            color="dark"
            placeholder={t('lastName')}
            onChangeText={(value) => setLastName(value)}
            defaultValue={lastName}
            error={lastName.length === 0}
          />

          <Input
            color="dark"
            placeholder={t('username')}
            onChangeText={(value) => setUsername(value)}
            defaultValue={username}
            error={username.length === 0}
          />

          <View style={styles.location}>
            <Text
              fontSize={17}
              color={location ? 'dark' : 'light_grey'}
              onPress={navigateToAddLocation}
              numberOfLines={1}
            >
              {location ? location : t('place')}
            </Text>
          </View>

          <Icon
            style={styles.icon}
            source={close}
            color="accent"
            width={12}
            height={12}
            onPress={() => setLocation('')}
          />

          <Input
            color="dark"
            placeholder={t('bio')}
            defaultValue={bio}
            onChangeText={handleBio}
            style={{ paddingRight: 55 }}
          />
          <Text color="accent" fontSize={15} style={styles.counter}>
            {`${bio ? bio.length : 0}/${MAX_CHARACTERS}`}
          </Text>

          <Input
            color="dark"
            placeholder={t('website')}
            keyboardType="url"
            textContentType="URL"
            onChangeText={(value) => setWebsite(value)}
            defaultValue={website}
            autoCorrect={false}
          />
        </View>
      </ScrollView>
    </Page>
  )
}

export default EditProfile
