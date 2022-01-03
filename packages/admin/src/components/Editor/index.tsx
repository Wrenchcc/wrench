import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'

const ReactEditorJS = createReactEditorJS()

function Editor({ data, instanceRef }) {
  return <ReactEditorJS tools={EDITOR_JS_TOOLS} data={data} instanceRef={instanceRef} />
}

export default Editor
