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

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    debug(`🚀 Server ready at http://localhost:${PORT}`)
  })
})
