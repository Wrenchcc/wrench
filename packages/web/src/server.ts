import * as express from 'express'
import * as next from 'next'
import * as i18nextMiddleware from 'i18next-express-middleware'
import i18n from './i18n'
import { routes } from './routes'

const debug = require('debug')('web:server')

const PORT = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV === 'development'
const dir = './src'

const app = next({
  dir,
  conf: !dev && { distDir: '../.next', poweredByHeader: false },
  dev,
})

const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by')
  server.use(i18nextMiddleware.handle(i18n))

  server.get('/.well-known/apple-app-site-association', (_, res) => {
    res.json({
      applinks: {
        apps: [],
        details: [
          {
            appID: 'YN735AEV47.cc.wrench.app',
            paths: ['*'],
          },
        ],
      },
    })
  })

  server.get('/.well-known/assetlinks.json', (_, res) => {
    res.json({
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.wrench',
        sha256_cert_fingerprints: [
          '76:B8:B0:34:C1:35:15:09:1C:7C:7D:7D:F7:60:2D:4D:C6:B0:BE:63:3A:A4:0F:E4:3B:86:9D:43:0F:27:DD:22',
        ],
      },
    })
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) {
      throw err
    }
    debug(`🚀 Server ready at http://localhost:${PORT}`)
  })
})
