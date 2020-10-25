// @ts-nocheck
import React from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import Layout from '../../components/Layout'
import Editor from '../../components/Editor'
import Input from '../../components/Input'

const Title = styled.div`
 margin-bottom: 30px;
`

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
`

const Save = styled.button`
  height: 40px;
  background: black;
  color: white;
  border: none;
  padding: 0 50px;
  margin-left: 20px;
`

const Preview = styled.button`
  height: 40px;
  background: #e6e7e9;
  color: black;
  border: none;
  padding: 0 50px;
`


const data = {
  time: 1556098174501,
  blocks: [
    {
      type: "header",
      data: {
        text: "Editor.js",
        level: 2
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
      }
    },
    {
      type: "header",
      data: {
        text: "Key features",
        level: 3
      }
    },
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API"
        ]
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 3
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Clean data is useful to sanitize, validate and process on the backend."
      }
    },
    {
      type: "delimiter",
      data: {}
    },
    {
      type: "paragraph",
      data: {
        text:
          "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
      }
    },
    {
      type: "image",
      data: {
        file: {
          url:
            "https://edge-files.wrench.cc/images/c46e5e12-c57a-4c7f-83a5-22bcb61ea840.jpg?w=640&h=640&dpr=2&webp=1"
        },
        caption: "",
        withBorder: true,
        stretched: false,
        withBackground: false
      }
    }
  ],
  version: "2.12.4"
}

function Edit() {
  const {id} = useParams()
  console.log(id)
  
  return <Layout title="Edit">
    <Actions>
      <Preview>Preview</Preview>
      <Save>Save</Save>
    </Actions>

    <Title><Input placeholder="Title"/></Title>
    <Editor data={data} />
  </Layout>
}

export default Edit
