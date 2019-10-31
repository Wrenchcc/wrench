import * as elasticsearch from '../src/services/elasticsearch'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'

// TODO: https://www.elastic.co/blog/moving-from-types-to-typeless-apis-in-elasticsearch-7-0
// https://www.elastic.co/guide/en/elasticsearch/reference/7.0/removal-of-types.html
async function createIndex() {
  try {
    debug(`Creating index: ${INDEX_NAME}.`)

    await elasticsearch.client({
      method: 'PUT',
      path: `${INDEX_NAME}?include_type_name=true`,
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
    debug('Could not create index. %s', err)
  }
}

createIndex()
