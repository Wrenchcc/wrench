import * as express from 'express'
import * as next from 'next'
import * as i18nextMiddleware from 'i18next-express-middleware'
import i18n from './i18n'
import { routes } from './routes'

const PORT = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV === 'development'
const dir = './src'

const app = next({ dev, dir })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by').use(i18nextMiddleware.handle(i18n))

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
  })
})
