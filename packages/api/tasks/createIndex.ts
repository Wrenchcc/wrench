import * as elasticsearch from '../src/services/elasticsearch'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'

async function createIndex() {
  try {
    debug(`Creating index: ${INDEX_NAME}.`)

    await elasticsearch.client({
      path: INDEX_NAME,
      method: 'PUT',
      body: JSON.stringify({
        mappings: {
          vehicle: {
            properties: {
              brand: {
                type: 'text',
                copy_to: 'suggestion',
              },
              model: {
                type: 'text',
                copy_to: 'suggestion',
              },
              year: {
                type: 'text',
                copy_to: 'suggestion',
              },
              suggestion: {
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete',
                type: 'text',
              },
            },
          },
        },
        settings: {
          analysis: {
            analyzer: {
              autocomplete: {
                tokenizer: 'autocomplete',
                filter: [
                  'lowercase',
                  'word_delimiter_graph',
                  'unique',
                  'custom_shingle',
                  'my_char_filter',
                ],
              },
            },
            filter: {
              word_delimiter_graph: {
                type: 'word_delimiter_graph',
                preserve_original: true,
              },
              custom_shingle: {
                type: 'shingle',
                min_shingle_size: 2,
                max_shingle_size: 3,
                output_unigrams: true,
              },
              my_char_filter: {
                type: 'pattern_replace',
                pattern: ' ',
                replacement: '',
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
      }),
    })

    debug('Index created.')
  } catch (err) {
    debug('Could not create index. %s', err.response.data.error.reason)
  }
}

createIndex()
