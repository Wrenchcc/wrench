import * as elasticsearch from 'src/services/elasticsearch'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'

async function deleteIndex() {
  try {
    debug(`Deleting index: ${INDEX_NAME}.`)
    await elasticsearch.client({
      method: 'DELETE',
      path: INDEX_NAME,
    })
    debug('Index deleted.')
  } catch {
    debug(`Could not delete index: ${INDEX_NAME}.`)
  }
}

deleteIndex()
