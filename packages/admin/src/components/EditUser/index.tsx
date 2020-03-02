// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useUserQuery, useEditUserMutation } from '@wrench/common'
import styled from 'styled-components'
import Avatar from '../Avatar'
import Input from '../Input'

const Base = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div``

const Button = styled.button`
  height: 50px;
  background: black;
  width: 100%;
  margin-top: 40px;
  color: white;
`

const Open = styled.span`
  margin-top: 20px;
  display: block;
  color: black;
  font-size: 14px;
  font-weight: 500;
`

const Center = styled.div`
  align-self: center;
  margin-bottom: 20px;
`

function EditUser({ username }) {
  const [isOpen, setOpen] = useState(false)

  const [editUser] = useEditUserMutation()

  const { data } = useUserQuery({
    variables: {
      username,
    },
  })

  const [settings, setSettings] = useState({
    lastName: '',
    firstName: '',
    location: '',
    bio: '',
    website: '',
  })

  useEffect(() => {
    setSettings({
      lastName: data?.user.lastName,
      firstName: data?.user.firstName,
      location: data?.user.location,
      bio: data?.user.bio,
      website: data?.user.website,
    })
  }, [data])

  const updateField = (field, evt) => setSettings({ ...settings, [field]: evt.target.value })

  const handleSave = () => {
    editUser({
      variables: {
        id: data?.user.id,
        input: settings,
      },
    })
  }

  return (
    <Base>
      <Center>
        <Avatar src={data?.user?.avatarUrl} size={120} />
      </Center>
      <Row>
        <Input
          value={settings.firstName}
          placeholder="Firstname"
          onChange={firstName => updateField('firstName', firstName)}
        />
      </Row>
      <Row>
        <Input
          value={settings.lastName}
          placeholder="Lastname"
          onChange={firstName => updateField('lastName', firstName)}
        />
      </Row>
      <Row>
        <Input
          value={settings.website}
          placeholder="Website"
          onChange={firstName => updateField('website', firstName)}
        />
      </Row>
      <Row>
        <Input
          value={settings.bio}
          placeholder="Bio"
          onChange={firstName => updateField('bio', firstName)}
        />
      </Row>

      {isOpen && (
        <pre>
          <code>{JSON.stringify(data?.user, null, 2)}</code>
        </pre>
      )}

      <Row>
        <Open onClick={() => setOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'} raw data</Open>
      </Row>

      <Row>
        <Button onClick={handleSave}>Save</Button>
      </Row>
    </Base>
  )
}

export default EditUser
