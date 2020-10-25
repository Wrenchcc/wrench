import React from 'react'
import EditorJs from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'

function Editor({ data, instanceRef }) {
  return <EditorJs tools={EDITOR_JS_TOOLS} data={data} instanceRef={instanceRef} />
}

export default Editor
