import React from 'react'
import { Subscribe } from 'unstated'

export default function withSubscribe(containers, WrappedComponent) {
  return (...containers) => (
    <Subscribe to={containers}>
      {(...containers) => <WrappedComponent containers={containers} />}
    </Subscribe>
  )
}
