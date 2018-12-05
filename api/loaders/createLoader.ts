import * as DataLoader from 'dataloader'
import unique from 'api/utils/unique'

// These helper functions were taken from the DataLoader docs
// https://github.com/facebook/dataloader/blob/master/examples/RethinkDB.md
// function indexResults(results, indexField, cacheKeyFn) {
//   const indexedResults = new Map()
//   results.forEach(res => {
//     const key = typeof indexField === 'function' ? indexField(res) : res[indexField]
//     indexedResults.set(cacheKeyFn(key), res)
//   })
//   return indexedResults
// }

// function normalizeDbResults(keys, indexField, cacheKeyFn) {
//   return results => {
//     const indexedResults = indexResults(results, indexField, cacheKeyFn)
//     return keys.map(val => indexedResults.get(cacheKeyFn(val)) || null)
//   }
// }

/**
 * Create a dataloader instance for a request and type
 *
 * Usage:
 * createUserLoader = () => createLoader(users => getUsers(users), 'id');
 */
export default (batchFn, indexField = 'id', cacheKeyFn = key => key) => options => new DataLoader(
  keys => batchFn(unique(keys)).then(normalizeDbResults(keys, indexField, cacheKeyFn)),
  options
)
