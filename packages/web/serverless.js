const NextJsComponent = require('@sls-next/serverless-component')
const fs = require('fs-extra')

const inputs = {
  domain: 'wrench.cc',
  bucketName: 'wrench-web-edge',
  build: true,
  memory: 2048,
  cloudfront: {
    defaults: {
      forward: {
        headers: ['CloudFront-Viewer-Country', 'Accept-Language'],
      },
    },
    // origins: [
    //   {
    //     url: 'https://wrench-web-edge.s3.amazonaws.com',
    //     pathPatterns: {
    //       '/.well-known/*': {
    //         minTTL: 20,
    //         maxTTL: 20,
    //         defaultTTL: 20,
    //       },
    //     },
    //   },
    // ],
  },
}

class MyNextJsComponent extends NextJsComponent {
  async default() {
    if (inputs.build !== false) {
      console.log('-> Building...')
      await this.build(inputs)
      console.log('Building was successful')
    }
    console.log('-> Copying locales directory...')
    this.copyLocales()
    console.log('Locale directory was copied successfully')
    console.log('-> Updating manifest...')
    this.updateNonDynamicManifest()
    console.log('Manifest update successful')
    console.log('-> Deploying...')

    return this.deploy(inputs)
  }

  copyLocales() {
    const localeSrc = './public/locales'
    const localeDest = './.serverless_nextjs/default-lambda/public/locales'
    fs.copySync(localeSrc, localeDest, { recursive: true })
  }

  updateNonDynamicManifest() {
    const manifestFileName = './.serverless_nextjs/default-lambda/manifest.json'
    const manifestJson = require(manifestFileName)
    manifestJson.pages.ssr.nonDynamic['/index'] = 'pages/index.js'
    fs.writeFileSync(manifestFileName, JSON.stringify(manifestJson))
  }
}

module.exports = MyNextJsComponent
