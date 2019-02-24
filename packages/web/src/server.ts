import * as express from 'express'
import * as next from 'next'
import * as i18nextMiddleware from 'i18next-express-middleware'
import i18n from './i18n'
import { routes } from './routes'

const PORT = parseInt(process.env.PORT, 10) || 3000
const DEV = process.env.NODE_ENV !== 'production'

const app = next({
  dev: DEV,
  dir: './src',
  conf: !DEV && { poweredByHeader: false },
})

i18n.use(i18nextMiddleware.LanguageDetector)

const handle = routes.getRequestHandler(app)

async function blaj() {
  await app.prepare()
  const server = express()

  server.use(i18nextMiddleware.handle(i18n))

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
  })
}

blaj()
