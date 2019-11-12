import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import buildTags from './buildTags'
import defaultConfig from './config'

function Seo({ config, router }) {
  return <Head>{buildTags({ ...defaultConfig, ...config, router })}</Head>
}

export default withRouter(Seo)
