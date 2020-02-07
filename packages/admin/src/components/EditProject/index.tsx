// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useProjectQuery, useEditProjectMutation } from '@wrench/common'
import styled from 'styled-components'
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

function EditProject({ id }) {
  const [isOpen, setOpen] = useState(false)

  const [editProject] = useEditProjectMutation()

  const { data } = useProjectQuery({
    variables: {
      id,
    },
  })

  const [settings, setSettings] = useState({
    title: '',
    slug: '',
  })

  useEffect(() => {
    setSettings({
      ...data?.project,
    })
  }, [data])

  const updateField = (field, evt) => setSettings({ ...data, [field]: evt.target.value })

  const handleSave = () => {
    editProject({
      variables: {
        input: settings,
      },
    })
  }

  return (
    <Base>
      <Row>
        <Input
          value={settings.title}
          placeholder="Title"
          onChange={firstName => updateField('title', firstName)}
        />
      </Row>
      <Row>
        <Input
          value={settings.slug}
          placeholder="slug"
          onChange={slug => updateField('slug', slug)}
        />
      </Row>

      {isOpen && (
        <pre>
          <code>{JSON.stringify(data?.project, null, 2)}</code>
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

export default EditProject
