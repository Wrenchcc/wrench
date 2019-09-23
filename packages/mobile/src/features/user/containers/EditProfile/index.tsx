import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { useQuery, CURRENT_USER_QUERY } from 'gql'
import { useUserStore, USER } from 'store'
import { Header, Text, Title, Icon, Touchable, Avatar, Input } from 'ui'
import { COLORS } from 'ui/constants'
import { close } from 'images'
import { isIphone } from 'utils/platform'
import { Information, Row, Counter, ChangeAvatar, Overlay } from './styles'

const KEYBOARD_BEHAVIOR = isIphone && 'position'
const MAX_CHARACTERS = 100

function EditProfile() {
  const { t } = useTranslation()
  const { dismissModal, navigateTo } = useNavigation()
  const [isSaving, setSaving] = useState(false)

  const { data } = useQuery(CURRENT_USER_QUERY)

  const { update, location, bio, website } = useUserStore(store => ({
    update: store.actions.update,
    location: store.location,
    bio: store.bio,
    website: store.website,
  }))

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

  const handleSave = useCallback(() => {
    setSaving(true)

    setTimeout(dismissModal, 500)
  }, [setSaving, dismissModal])

  const handleChangeAvatar = useCallback(() => {
    navigateTo(SCREENS.ADD_AVATAR, {
      options: {
        layout: {
          backgroundColor: COLORS.DARK,
        },
        statusBar: {
          backgroundColor: 'black',
          style: 'light',
          visible: isIphone ? false : true,
        },
      },
    })
  }, [navigateTo])

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
