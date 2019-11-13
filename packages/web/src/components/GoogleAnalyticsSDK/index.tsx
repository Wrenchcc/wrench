import React from 'react'
import Head from 'next/head'
import { useAmp } from 'next/amp'

const GoogleAnalyticsSDK = () => {
  const isAmp = useAmp()

  if (isAmp) {
    return (
      <>
        <Head>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          />
        </Head>
        <amp-analytics type="gtag" data-credentials="include">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                vars: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  gtag_id: `${process.env.GA_TRACKING_ID}`,
                  config: {
                    [`${process.env.GA_TRACKING_ID}`]: { groups: 'default' },
                  },
                },
              }),
            }}
          />
        </amp-analytics>
      </>
    )
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${process.env.GA_TRACKING_ID}');`,
        }}
      />
    </>
  )
}

export default GoogleAnalyticsSDK
