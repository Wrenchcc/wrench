import micro from 'micro'

const debug = require('debug')('api:jupiter')

const { PORT = 5000 } = process.env

micro(async (req, res) => ({ data: 'ping' })).listen(PORT)

debug('🚀  Jupiter ready at %s', `http://localhost:${PORT}`)
