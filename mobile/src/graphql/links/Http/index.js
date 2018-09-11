import Config from 'react-native-config'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { createUploadLink } from 'apollo-upload-client'

/**
 * Apollo Terminating link
 * The split will skip Batching if an
 * operation's context contains hasUpload: true.
 * Then within a mutation component, specify the context
 * with hasUpload to activate the Upload link.
 * https://github.com/jaydenseric/apollo-upload-client/issues/34#issuecomment-406157217
 *
 * const { data } = await uploadMutation({
 * variables: { file },
 *   context: {
 *     hasUpload: true, // activate Upload link
 *   }
 * })
 */

const options = {
  uri: Config.WRENCH_GRAPHQL_URI,
}

export default ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  new BatchHttpLink(options)
)
