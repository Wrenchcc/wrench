// @ts-nocheck
import React, { useState, useCallback, useEffect } from 'react'
import { Element } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CURRENT_USER } from 'graphql/queries/user/currentUser'
import { CURRENT_USER_SETTINGS_QUERY } from 'graphql/queries/user/currentUserSettings'
import { EDIT_USER_MUTATION } from 'graphql/mutations/user/editUser'
import { TOGGLE_NOTIFICATION_SETTINGS_MUTATION } from 'graphql/mutations/user/toggleNotificationSettings'
import { SUPPORTED_LOCALS } from 'i18n'
import { useCookie, Cookies } from 'hooks'
import { Layout, Title, Text, Switch, Input, SearchLocation, Button } from 'ui'
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

function Settings() {
  const { t } = useTranslation()
  const [saved, setSaved] = useState(false)
  const [selectedLanguage] = useCookie(Cookies.PREFERRED_LANGUAGE)

  const [data, setData] = useState({
    lastName: '',
    firstName: '',
    location: '',
    bio: '',
    website: '',
    avatarUrl: null,
  })

  const currentUser = useQuery(CURRENT_USER)
  const userSettings = useQuery(CURRENT_USER_SETTINGS_QUERY)
  const [editUser, { error }] = useMutation(EDIT_USER_MUTATION)
  const [toggleNotificationSettings] = useMutation(TOGGLE_NOTIFICATION_SETTINGS_MUTATION)

  const generateNotificationSettings = ({ notifications }, deliveryMethod) => {
    if (!notifications) {
      return null
    }

    const types = Object.keys(notifications.types).filter(type => type !== '__typename')

    return types.map(type => ({
      titleKey: `notifications.${type}`,
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
    text => {
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
          <Text color="white" medium>
            {t('Settings:toast.saved')}
          </Text>
        </Toast>
      )}

      {error && (
        <Toast error>
          <Text color="white" medium>
            {t('Settings:toast.error')}
          </Text>
        </Toast>
      )}

      <Left>
        <MenuTitle fontSize={36}>{t('Settings:title')}</MenuTitle>

        <MenuItem to="edit-profile" smooth duration={250} spy offset={-150}>
          <Text color="grey">{t('Settings:sections.profile')}</Text>
        </MenuItem>
        <MenuItem to="notifications" smooth duration={250} spy offset={-150}>
          <Text color="grey">{t('Settings:sections.notifications')}</Text>
        </MenuItem>
        <MenuItem to="language" smooth duration={250} spy offset={-150}>
          <Text color="grey">{t('Settings:sections.language')}</Text>
        </MenuItem>
        <MenuItem to="support" smooth duration={250} spy offset={-150}>
          <Text color="grey">{t('Settings:sections.support')}</Text>
        </MenuItem>
      </Left>

      <Right>
        <Element name={'edit-profile'}>
          <Section>
            <Headline>
              <Title medium>{t('Settings:sections.profile')}</Title>
            </Headline>

            <Row>
              <Input
                placeholder={t('Settings:field.firstName')}
                value={data.firstName}
                required
                onChangeText={firstName => updateField('firstName', firstName)}
              />
            </Row>

            <Row>
              <Input
                placeholder={t('Settings:field.lastName')}
                value={data.lastName}
                required
                onChangeText={lastName => updateField('lastName', lastName)}
              />
            </Row>

            <Row>
              <SearchLocation
                onPress={location => updateField('location', location)}
                value={data.location}
              />
            </Row>

            <Row>
              <Input
                placeholder={t('Settings:field.bio')}
                onChangeText={handleBio}
                value={data.bio}
              />
              <Counter color="light_grey" fontSize={15}>
                {`${data.bio ? data.bio.length : 0}/${MAX_CHARACTERS}`}
              </Counter>
            </Row>

            <Row>
              <Input
                placeholder={t('Settings:field.website')}
                type="url"
                onChangeText={website => updateField('website', website)}
                value={data.website}
              />
            </Row>

            <Row last>
              <Button black onPress={handleSave}>
                {t('Settings:save')}
              </Button>
            </Row>
          </Section>
        </Element>

        <Element name="notifications">
          <Section>
            <Headline>
              <Title medium>{t('Settings:sections.notifications')}</Title>
            </Headline>

            {notifications &&
              notifications.map(({ titleKey, onPress, selected, type }) => (
                <Setting key={titleKey}>
                  {t(`Settings:${titleKey}`)}
                  <Switch selected={selected} onColor="black" name={type} onPress={onPress} />
                </Setting>
              ))}
          </Section>
        </Element>

        <Element name="language">
          <Section>
            <Headline>
              <Title medium>{t('Settings:sections.language')}</Title>
            </Headline>

            {SUPPORTED_LOCALS.map(locale => {
              return (
                <Setting key={locale}>
                  <a href={`?hl=${locale}`}>{t(`Settings:languages.${locale}`)}</a>
                  {selectedLanguage === locale && <img src={require('./check.svg')} />}
                </Setting>
              )
            })}
          </Section>
        </Element>

        <Element name="support">
          <Section>
            <Headline>
              <Title medium>{t('Settings:sections.support')}</Title>
            </Headline>

            <Setting>
              <a href="mailto:support@wrench.cc">{t('Settings:mail')}</a>
            </Setting>
            <Setting>
              {' '}
              <a href="mailto:feedback@wrench.cc">{t('Settings:feedback')}</a>
            </Setting>
            <Setting>
              <a href="https://m.me/wrench.cc">{t('Settings:chat')}</a>
            </Setting>
          </Section>
        </Element>
      </Right>
    </Layout>
  )
}

export default Settings
