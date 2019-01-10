import client from 'api/services/elasticsearch/client'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

async function createIndex() {
  try {
    debug(`Creating index: ${INDEX_NAME}.`)

    await client.put(INDEX_NAME, {
      mappings: {
        vehicle: {
          properties: {
            brand: {
              analyzer: 'autocomplete',
              search_analyzer: 'autocomplete_search',
              type: 'text',
            },
            model: {
              analyzer: 'autocomplete',
              search_analyzer: 'autocomplete_search',
              type: 'text',
            },
            year: {
              analyzer: 'autocomplete',
              search_analyzer: 'autocomplete_search',
              type: 'text',
            },
          },
        },
      },
      settings: {
        analysis: {
          analyzer: {
            autocomplete: {
              filter: ['lowercase'],
              tokenizer: 'autocomplete',
            },
            autocomplete_search: {
              tokenizer: 'lowercase',
            },
          },
          tokenizer: {
            autocomplete: {
              max_gram: 20,
              min_gram: 2,
              token_chars: ['letter', 'digit', 'whitespace'],
              type: 'edge_ngram',
            },
          },
        },
      },
    })

    debug('Index created.')
  } catch (err) {
    debug('Could not create index. %s', err.response.data.error.reason)
  }
}

createIndex()
