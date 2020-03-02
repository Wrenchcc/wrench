// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { usePostQuery, useEditPostMutation } from '@wrench/common'
import styled from 'styled-components'
import { PlaceholderBoxLarge } from '../Placeholder'
import Input from '../Input'

const Base = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div``

const Button = styled.button`
  height: 50px;
  background: black;
  margin-top: 40px;
  color: white;
  width: 100%;
`

const Open = styled.span`
  margin-top: 20px;
  display: block;
  color: black;
  font-size: 14px;
  font-weight: 500;
`

function EditPost({ id }) {
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [editPost] = useEditPostMutation()

  const { data } = usePostQuery({
    variables: {
      id,
    },
  })

  const [settings, setSettings] = useState({
    caption: '',
  })

  useEffect(() => {
    setSettings({
      ...data?.post,
    })
  }, [data])

  const updateField = (field, evt) => setSettings({ [field]: evt.target.value })

  const handleSave = () => {
    editPost({
      variables: {
        id,
        input: settings,
      },
    })
  }

  return (
    <Base>
      <Row
        style={{
          height: 390,
          overflow: 'auto',
          flexDirection: 'row',
          display: 'flex',
          position: 'relative',
        }}
      >
        {loading && (
          <div style={{ position: 'absolute' }}>
            <PlaceholderBoxLarge />
          </div>
        )}
        {data?.post?.files.edges.map(({ node }) => (
          <img
            key={node.id}
            src={node.uri}
            style={{ width: 390, height: 390, display: 'block' }}
            onLoad={() => setLoading(false)}
          />
        ))}
      </Row>

      <Row>
        <Input
          value={settings.caption}
          placeholder="Caption"
          onChange={caption => updateField('caption', caption)}
        />
      </Row>
      {isOpen && (
        <pre>
          <code>{JSON.stringify(data?.post, null, 2)}</code>
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

export default EditPost
