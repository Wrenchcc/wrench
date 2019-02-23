import { createServer } from 'http'
import * as next from 'next'
import { routes } from './routes'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV === 'development'
const app = next({ dev, dir: './src' })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
