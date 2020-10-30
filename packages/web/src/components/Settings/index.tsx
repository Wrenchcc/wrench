// @ts-nocheck
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Element } from 'react-scroll'
import { locales } from '@wrench/translations'
import { CheckMarkIcon } from '@wrench/ui'
import { useTranslation, i18n } from 'i18n'
import { I18nContext } from 'next-i18next'
import {
  useEditUserMutation,
  useCurrentUserSettingsQuery,
  useCurrentUserQuery,
  useToggleNotificationSettingsMutation,
} from '@wrench/common'
import { Layout, Title, Text, Switch, Input, SearchLocation, Button, Icon } from 'ui'
import {
  Left,
  Right,
  MenuItem,
  MenuTitle,
  Section,
  Row,
  Counter,
  Headline,
  Toast,
  Setting,
} from './styles'

const MAX_CHARACTERS = 100
const CDN_DOMAIN = 'https://edge-files.wrench.cc'

function Settings({ isAuthenticated }) {
  if (!isAuthenticated) {
    return null
  }

  const {
    i18n: { language },
  } = useContext(I18nContext)

  const { t } = useTranslation(['settings'])
  const [saved, setSaved] = useState(false)

  const [data, setData] = useState({
    lastName: '',
    firstName: '',
    location: '',
    bio: '',
    website: '',
    avatarUrl: null,
  })

  const currentUser = useCurrentUserQuery()
  const userSettings = useCurrentUserSettingsQuery()
  const [editUser, { error }] = useEditUserMutation()
  const [toggleNotificationSettings] = useToggleNotificationSettingsMutation()

  const generateNotificationSettings = ({ notifications }, deliveryMethod) => {
    if (!notifications) {
      return null
    }

    const types = Object.keys(notifications.types).filter((type) => type !== '__typename')

    return types.map((type) => ({
      titleKey: type.toLowerCase(),
      type,
      onPress: () => {
        setSaved(true)

        setTimeout(() => {
          setSaved(false)
        }, 4000)

        return toggleNotificationSettings({
          variables: {
            input: {
              notificationType: type,
              deliveryMethod,
            },
          },
        })
      },
      selected: notifications.types[type][deliveryMethod],
    }))
  }

  const notifications = generateNotificationSettings(
    {
      notifications: userSettings.data && userSettings.data.user.settings.notifications,
    },
    'email'
  )

  useEffect(() => {
    setData({
      firstName: currentUser.data.user.firstName,
      lastName: currentUser.data.user.lastName,
      bio: currentUser.data.user.bio,
      location: currentUser.data.user.location,
      website: currentUser.data.user.website,
      avatarUrl: currentUser.data.user.avatarUrl.replace(`${CDN_DOMAIN}/avatar/`, ''),
    })
  }, [currentUser])

  const updateField = (field, value) => setData({ ...data, [field]: value })

  const handleBio = useCallback(
    (text) => {
      if (text.length <= MAX_CHARACTERS) {
        updateField('bio', text)
      }
    },
    [updateField]
  )

  const handleSave = async () => {
    await editUser({
      variables: {
        input: {
          ...data,
        },
      },
    })
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 4000)
  }

  return (
    <Layout>
      {saved && (
        <Toast>
          <Text color="inverted" medium>
            {t('toast_saved')}
          </Text>
        </Toast>
      )}

      {error && (
        <Toast error>
          <Text color="inverted" medium>
            {t('toast_error')}
          </Text>
        </Toast>
      )}

      <Left>
        <MenuTitle fontSize={36}>{t('title')}</MenuTitle>

        <MenuItem to="edit-profile" smooth duration={250} spy offset={-150}>
          <Text color="neutral">{t('sections_profile')}</Text>
        </MenuItem>
        <MenuItem to="notifications" smooth duration={250} spy offset={-150}>
          <Text color="neutral">{t('sections_notifications')}</Text>
        </MenuItem>
        <MenuItem to="language" smooth duration={250} spy offset={-150}>
          <Text color="neutral">{t('sections_language')}</Text>
        </MenuItem>
        <MenuItem to="support" smooth duration={250} spy offset={-150}>
          <Text color="neutral">{t('sections_support')}</Text>
        </MenuItem>
      </Left>

      <Right>
        <Element name={'edit-profile'}>
          <Section>
            <Headline>
              <Title medium>{t('sections_profile')}</Title>
            </Headline>

            <Row>
              <Input
                placeholder={t('field_firstname')}
                value={data.firstName}
                required
                onChangeText={(firstName) => updateField('firstName', firstName)}
              />
            </Row>

            <Row>
              <Input
                placeholder={t('field_lastname')}
                value={data.lastName}
                required
                onChangeText={(lastName) => updateField('lastName', lastName)}
              />
            </Row>

            <Row>
              <SearchLocation
                onPress={(location) => updateField('location', location)}
                value={data.location}
              />
            </Row>

            <Row>
              <Input placeholder={t('field_bio')} onChangeText={handleBio} value={data.bio} />
              <Counter color="neutral" fontSize={15}>
                {`${data.bio ? data.bio.length : 0}/${MAX_CHARACTERS}`}
              </Counter>
            </Row>

            <Row>
              <Input
                placeholder={t('field_website')}
                type="url"
                onChangeText={(website) => updateField('website', website)}
                value={data.website}
              />
            </Row>

            <Row last>
              <Button black onPress={handleSave}>
                {t('save')}
              </Button>
            </Row>
          </Section>
        </Element>

        <Element name="notifications">
          <Section>
            <Headline>
              <Title medium>{t('sections_notifications')}</Title>
            </Headline>

            {notifications &&
              notifications.map(({ titleKey, onPress, selected, type }) => (
                <Setting key={titleKey}>
                  <Text>{t(titleKey)}</Text>
                  <Switch selected={selected} name={type} onPress={onPress} />
                </Setting>
              ))}
          </Section>
        </Element>

        <Element name="language">
          <Section>
            <Headline>
              <Title medium>{t('sections_language')}</Title>
            </Headline>

            {locales.map((locale) => {
              return (
                <Setting key={locale}>
                  <span onClick={() => i18n.changeLanguage(locale)}>
                    <Text>{t(`languages:${locale}`)}</Text>
                  </span>
                  {language === locale && <CheckMarkIcon />}
                </Setting>
              )
            })}
          </Section>
        </Element>

        <Element name="support">
          <Section>
            <Headline>
              <Title medium>{t('sections_support')}</Title>
            </Headline>

            <Setting>
              <a href="mailto:support@wrench.cc">{t('mail')}</a>
            </Setting>
            <Setting>
              {' '}
              <a href="mailto:feedback@wrench.cc">{t('feedback')}</a>
            </Setting>
            <Setting>
              <a href="https://m.me/wrench.cc">{t('chat')}</a>
            </Setting>
          </Section>
        </Element>
      </Right>
    </Layout>
  )
}

export default Settings
