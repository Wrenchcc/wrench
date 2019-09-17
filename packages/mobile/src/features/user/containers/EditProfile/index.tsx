import React, { useState, useCallback } from 'react'
import { ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
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
  const [isLoading, setLoading] = useState(false)
  const [bio, setBio] = useState('')

  const handleBio = useCallback(
    text => {
      if (text.length <= MAX_CHARACTERS) {
        setBio(text)
      }
    },
    [setBio]
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
    setLoading(true)

    setTimeout(dismissModal, 500)
  }, [setLoading, dismissModal])

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
          isLoading ? (
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
            <Avatar
              uri="https://edge-files.wrench.cc/avatar/c1f69907-1355-4f0e-a690-1acbbe848142.jpg?w=120&h=120?dpr=2"
              size={120}
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
              <Touchable onPress={navigateToAddLocation} nativeHandler>
                <Input
                  placeholder={t('EditProfile:place')}
                  editable={false}
                  textContentType="location"
                />
              </Touchable>
            </Row>

            <Row>
              <Input
                color="dark"
                placeholder={t('EditProfile:bio')}
                value={bio}
                onChangeText={handleBio}
                style={{ paddingRight: 50 }}
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
              />
            </Row>
          </Information>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default EditProfile
