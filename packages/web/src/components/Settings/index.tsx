// @ts-nocheck
import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CURRENT_USER } from 'graphql/queries/user/currentUser'
import { EDIT_USER_MUTATION } from 'graphql/mutations/user/editUser'
import { Layout, Title, Text, Switch, Input, SearchLocation, Button } from 'ui'
import { Left, Right, MenuItem, MenuTitle, Section, Row, Counter, Headline, Toast } from './styles'

const MAX_CHARACTERS = 100
const CDN_DOMAIN = 'https://edge-files.wrench.cc'

function Settings() {
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState({
    lastName: '',
    firstName: '',
    location: '',
    bio: '',
    website: '',
    avatarUrl: null,
  })

  const currentUser = useQuery(CURRENT_USER)
  const [editUser, { error }] = useMutation(EDIT_USER_MUTATION)

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
            Settings saved
          </Text>
        </Toast>
      )}

      {error && (
        <Toast error>
          <Text color="white" medium>
            Something went wrong
          </Text>
        </Toast>
      )}

      <Left>
        <MenuTitle fontSize={36}>Settings</MenuTitle>

        <MenuItem href="#edit-profile">Edit profile</MenuItem>
        <MenuItem href="#notifications">Notifications</MenuItem>
        <MenuItem href="#language">Language</MenuItem>
        <MenuItem href="#support">Support</MenuItem>
      </Left>
      <Right>
        <Section id="edit-profile">
          <Headline>
            <Title medium>Edit profile</Title>
          </Headline>

          <Row>
            <Input
              placeholder="Firstname"
              value={data.firstName}
              required
              onChangeText={firstName => updateField('firstName', firstName)}
            />
          </Row>

          <Row>
            <Input
              placeholder="Lastname"
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
            <Input placeholder="Bio" onChangeText={handleBio} value={data.bio} />
            <Counter color="light_grey" fontSize={15}>
              {`${data.bio ? data.bio.length : 0}/${MAX_CHARACTERS}`}
            </Counter>
          </Row>

          <Row>
            <Input
              placeholder="Website"
              type="url"
              onChangeText={website => updateField('website', website)}
              value={data.website}
            />
          </Row>

          <Row last>
            <Button black onPress={handleSave}>
              Save
            </Button>
          </Row>
        </Section>

        <Section id="notifications">
          <Headline>
            <Title medium>Notifications</Title>
          </Headline>
          Email notifications Followers <Switch isOn={true} onColor="black" />
          Comments <Switch isOn={true} onColor="black" />
          Mentions <Switch isOn={true} onColor="black" />
          Articles <Switch isOn={true} onColor="black" />
          Similar projects <Switch isOn={true} onColor="black" />
          Product announcments <Switch isOn={true} onColor="black" />
        </Section>

        <Section id="language">
          <Headline>
            <Title medium>Language</Title>
          </Headline>
          English Swedish
        </Section>

        <Section id="support">
          <Headline>
            <Title medium>Support</Title>
          </Headline>
          Mail Support Feedback Chat with us
        </Section>
      </Right>
    </Layout>
  )
}

export default Settings
