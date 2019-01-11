const { path } = require('ramda')
const { omniZeroHits, orderSearchDegradationCounter } = require('./metrics')
const queryParser = require('../../../../utils/queryParser')

const getPersonaId = path(['user', 'persona_id'])
const { QUERY_TYPES } = require('../../../../constants')

const omni = resources => async (req, res, next) => search(resources, req)

const search = async ({ elasticsearchService, config, logger, searchIntegrationClient }, req) => {
  const personaId = getPersonaId(req)
  const indexName = config.get('ELASTICSEARCH_OMNI_INDEX')
  const response = await searchIntegrationClient.GenerationIds.byPersonaId({ personaId })
  const generationIds = collectGenerationIdsByType(response.data().generationIds)
  logger.info('Using generationIds', { generationIds, personaId })

  const elasticsearchQuery = createOmniSearchQuery({
    locale: req.query.locale,
    query: req.query.query,
    personaId,
    indexName,
    generationIds,
    logger,
  })

  return elasticsearchService
    .search(elasticsearchQuery)
    .then(searchResponse => {
      if (searchResponse.hits.total === 0) omniZeroHits.inc()
      logger.info('Omni search response', {
        personaId,
        searchResult: loggableSearchResponse(req.query.query, searchResponse),
      })
      return searchResponse
    })
    .then(searchResponse => createResponse(searchResponse, req.query.query))
}

const loggableSearchResponse = (query, searchResponse) => ({
  query,
  total: searchResponse.hits.total,
  hits: searchResponse.hits.hits.map(({ _score, _source }) => ({
    type: _source.type,
    id: _source.id,
    score: _score,
    merchant: _source.merchant ? _source.merchant.displayName : null,
    lineItems: _source.lineItems ? _source.lineItems.map(lineItem => lineItem.name) : null,
    purchasedAt: _source.purchasedAt,
    totalAmount: _source.totalAmount,
    personaId: _source.personaId,
    generationId: _source.generationId,
    indexedAt: _source.indexedAt,
  })),
})

const collectGenerationIdsByType = generationIds => {
  const ids = {}
  for (const { type, generationId } of generationIds) {
    ids[type] = generationId
  }
  return ids
}

const createOmniSearchQuery = ({ locale, query, personaId, indexName, generationIds, logger }) => ({
  index: indexName,
  type: 'doc',
  body: {
    from: 0,
    size: 20,
    min_score: 0.001,
    highlight: {
      number_of_fragments: 1,
      pre_tags: ['**'],
      post_tags: ['**'],
      type: 'plain',
      fields: {
        'lineItems.name': {},
        'merchant.displayName': {},
        'purchasedAt.date.year': {},
        'lineItems.price.amount': {},
        'totalAmount.amount': {},
      },
    },
    query: {
      dis_max: {
        queries: [
          createOrderQuery(
            query,
            { locale, personaId, generationId: generationIds.order },
            logger
          ),
        ].filter(Boolean),
      },
    },
    sort: ['_score', { purchasedAt: { order: 'desc' } }],
  },
})

const queryTypeMatcher = ({ query = '' }) => [
  {
    match_phrase: { 'merchant.displayName': query.toLowerCase() },
  },
  {
    match: { 'lineItems.name': query.toLowerCase() },
  },
]

const amountTypeMatcher = ({ intValue = '' }) => [
  { match: { 'lineItems.price.amount': intValue } },
  { match: { 'totalAmount.amount': intValue } },
]

const dateTypeMatcher = item => {
  const dateQueries = []
  if ('year' in item) {
    dateQueries.push({
      script: { script: `doc.purchasedAt.date.year == ${item.year}` },
    })
  }

  if ('month' in item) {
    dateQueries.push({
      script: { script: `doc.purchasedAt.date.monthOfYear == ${item.month}` },
    })
  }

  if ('day' in item) {
    dateQueries.push({
      script: { script: `doc.purchasedAt.date.dayOfMonth == ${item.day}` },
    })
  }

  return dateQueries
}

const createOrderQuery = (query, { locale, personaId, generationId }, logger) => {
  if (!generationId) {
    // Degrade dis_max query by omitting Orders query when we don't have the generationId for orders.
    logger.warn('Query degraded. Order query omitted because of missing order generation Id', {
      personaId,
    })
    orderSearchDegradationCounter.inc()
    return
  }

  const parsedQuery = queryParser(query, locale)
  const queries = parsedQuery.reduce((accumulator, item) => {
    switch (item.type) {
      case QUERY_TYPES.QUERY:
        return [...accumulator, ...queryTypeMatcher(item)]
      case QUERY_TYPES.DATE:
        return [...accumulator, ...dateTypeMatcher(item)]
      case QUERY_TYPES.AMOUNT:
        return [...accumulator, ...amountTypeMatcher(item)]
      default:
        return accumulator
    }
  }, [])

  return {
    bool: {
      should: queries,
      filter: [
        { term: { 'personaId.keyword': personaId } },
        { term: { 'generationId.keyword': generationId } },
        { term: { 'type.keyword': 'ORDER' } },
      ],
    },
  }
}

const createResponse = (searchResponse, query) => ({
  query,
  total: searchResponse.hits.total,
  hits: searchResponse.hits.hits.map(({ _source }) => _source),
})

module.exports = omni
