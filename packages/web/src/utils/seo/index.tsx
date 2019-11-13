import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import buildTags from './buildTags'
import defaultConfig from './config'

function Seo({ config = {} }) {
  const router = useRouter()

  return <Head>{buildTags({ ...defaultConfig, ...config, router })}</Head>
}

export default Seo
