import * as elasticsearch from 'api/services/elasticsearch'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'

// https://engineering.skroutz.gr/blog/implementing-a-fuzzy-suggestion-mechanism/
async function createIndex() {
  try {
    debug(`Creating index: ${INDEX_NAME}.`)

    await elasticsearch.client({
      path: INDEX_NAME,
      method: 'PUT',
      body: {
        mappings: {
          vehicle: {
            properties: {
              brand: {
                copy_to: 'suggest',
                type: 'text',
              },
              model: {
                copy_to: 'suggest',
                type: 'text',
              },
              suggestion: {
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
                type: 'text',
              },
              year: {
                // copy_to: 'suggest',
                type: 'keyword',
              },
            },
          },
        },
        settings: {
          analysis: {
            analyzer: {
              autocomplete: {
                tokenizer: 'autocomplete',
                filter: ['lowercase', 'word_delimiter_graph', 'unique'],
              },
              autocomplete_search: {
                filter: ['lowercase'],
                tokenizer: 'standard',
              },
            },
            filter: {
              word_delimiter_graph: {
                type: 'word_delimiter_graph',
                preserve_original: true,
              },
            },
            tokenizer: {
              autocomplete: {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 25,
                token_chars: ['letter', 'digit', 'punctuation', 'symbol', 'whitespace'],
              },
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
