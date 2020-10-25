import { client } from '../../'
import { PreSignUrlDocument } from '@wrench/common'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import SimpleImage from '@editorjs/simple-image'

const CDN_DOMAIN = 'https://edge-files.wrench.cc'
const UPLOAD_PATH = 'blog'
const FILE_TYPE = 'IMAGE'

async function preSignUrl(input) {
  try {
    return client.mutate({
      mutation: PreSignUrlDocument,
      variables: {
        input,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {
          const { data } = await preSignUrl({
            path: UPLOAD_PATH,
            type: FILE_TYPE,
          })

          await fetch(data.preSignUrl.url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          })

          return Promise.resolve({
            success: 1,
            file: {
              url: `${CDN_DOMAIN}/blog/${data.preSignUrl.filename}?w=undefined&h=undefined?dpr=2`,
            },
          })
        },
      },
    },
  },
  raw: Raw,
  header: Header,
  simpleImage: SimpleImage,
}
