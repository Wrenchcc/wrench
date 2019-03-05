import React from 'react'
import Feed from './feed'
import Home from './home'

export default function Index(props) {
  if (true) {
    return <Home {...props} />
  }
  return <Feed {...props} />
}
