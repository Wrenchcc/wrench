const NextJsComponent = require('@sls-next/serverless-component')
const fs = require('fs-extra')

class MyNextJsComponent extends NextJsComponent {
  async default(inputs = {}) {
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
