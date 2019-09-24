import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-picker'
import { useNavigation, SCREENS } from 'navigation'
import { useQuery, useMutation, CURRENT_USER_QUERY, EDIT_USER_MUTATION } from 'gql'
import { useUserStore, USER } from 'store'
import { Header, Text, Title, Icon, Touchable, Avatar, Input } from 'ui'
import { close } from 'images'
import { isIphone } from 'utils/platform'
import { Information, Row, Counter, ChangeAvatar, Overlay } from './styles'

const KEYBOARD_BEHAVIOR = isIphone && 'position'
const MAX_CHARACTERS = 100

function EditProfile() {
  const { t } = useTranslation()
  const { dismissModal, navigateTo } = useNavigation()

  const { data } = useQuery(CURRENT_USER_QUERY)

  const { update, location, bio, website } = useUserStore(store => ({
    update: store.actions.update,
    location: store.location,
    bio: store.bio,
    website: store.website,
  }))

  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION)

  useEffect(() => {
    update(USER.BIO, data.user.bio)
    update(USER.LOCATION, data.user.location)
    update(USER.WEBSITE, data.user.website)
  }, [update, data])

  const handleBio = useCallback(
    text => {
      if (text.length <= MAX_CHARACTERS) {
        update(USER.BIO, text)
      }
    },
    [update]
  )

  const handleWebsite = useCallback(
    text => {
      update(USER.WEBSITE, text)
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
      await editUser({
        variables: {
          input: {
            avatarUrl: '',
            location,
            bio,
            website,
          },
        },
      })

      setTimeout(dismissModal, 100)
    } catch (err) {
      console.log(err)
    }
  }, [dismissModal, location, bio, website])

  const handleChangeAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Avatar',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo…',
        chooseFromLibraryButtonTitle: 'Choose from Library…',
        mediaType: 'photo',
        permissionDenied: {
          title: 'Permission denied',
          text: 'To be able to take pictures with your camera and choose images from your library.',
          reTryTitle: 're-try',
          okTitle: "I'm sure",
        },
        tintColor: 'black',
      },
      res => {
        // if (res.didCancel) {
        //   console.log('User cancelled image picker')
        // } else if (res.error) {
        //   console.log('ImagePicker Error: ', res.error)
        // } else if (res.customButton) {
        //   console.log('User tapped custom button: ', res.customButton)
        // } else {
        //   const source = { uri: res.uri }
        // }
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
            <Avatar uri={data.user.avatarUrl} size={120} />
            <Overlay onPress={handleChangeAvatar} activeOpacity={1}>
              <Text color="white" medium fontSize={15}>
                {t('EditProfile:change')}
              </Text>
            </Overlay>
          </ChangeAvatar>

          <Information>
            <Title>{t('EditProfile:information')}</Title>

            <Row first>
              <Touchable onPress={navigateToAddLocation} nativeHandler>
                <Input
                  color="dark"
                  placeholder={t('EditProfile:place')}
                  editable={false}
                  textContentType="location"
                  value={location}
                />
              </Touchable>
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
                {`${bio.length}/${MAX_CHARACTERS}`}
              </Counter>
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:website')}
                keyboardType="url"
                textContentType="URL"
                onChangeText={handleWebsite}
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
