// @ts-nocheck
import React, {useRef, useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useBlogPostQuery, useAddBlogPostMutation } from '@wrench/common'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import Editor from '../../components/Editor'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

const Title = styled.div`
 margin-bottom: 30px;
`

const Actions = styled.div`
  z-index: 10;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  flex-direction: row;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
`

const Save = styled.button`
  height: 40px;
  background: black;
  color: white;
  border: none;
  padding: 0 40px;
  margin-left: 20px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
`


const Saving = styled(Loader)`
 margin-left: 10px;
`

const Preview = styled.button`
  height: 40px;
  background: #e6e7e9;
  color: black;
  border: none;
  padding: 0 50px;
`

function Edit() {
  const instanceRef = useRef(null)
  const {id} = useParams()
  const [addPost] = useAddBlogPostMutation()
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)

  const {data, loading} = useBlogPostQuery({
    skip: !id,
    variables: {
      id,
    }
  })

  useEffect(() => {
    setTitle(data?.blogPost.title)
  }, [data])

  const handleSave = async () => {
    setSaving(true)

    const data = await instanceRef.current.save()

    await addPost( {
      variables: {
        id,
        input: {
          title,
          content: JSON.stringify(data)
        }
      }
    })

    setSaving(false)

  }

  if(loading) {
    return null
  }

  return <Layout>
    <Title><Input onChange={(evt) => setTitle(evt.target.value)} placeholder="Title" value={title}/></Title>
    <Editor data={data && JSON.parse(data?.blogPost.content)} instanceRef={(instance) => (instanceRef.current = instance)} />

    <Actions>
      <Preview>Preview</Preview>
      <Save onClick={handleSave}><span>{saving ? 'Saving' : 'Save'}</span> {saving && <Saving white/>}</Save>
    </Actions>
  </Layout>
}

export default Edit
