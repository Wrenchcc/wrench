export default (totalCount, first, last) => ({
  hasNextPage: totalCount > first,
  hasPreviousPage: totalCount > last,
})
