import withApollo from 'next-with-apollo'
import Apollo from 'services/apollo'

export default withApollo(({ initialState }) => {
  Apollo.init(initialState)
  return Apollo.getClient()
})
