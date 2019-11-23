import withApollo from 'next-with-apollo'
import Apollo from 'services/apollo'
// import Cookie from 'services/cookie'

export default withApollo(({ initialState }) => {
  // if (headers && headers.cookie) {
  //   Cookie.init(headers && headers.cookie)
  // }

  Apollo.init(initialState)
  return Apollo.getClient()
})
