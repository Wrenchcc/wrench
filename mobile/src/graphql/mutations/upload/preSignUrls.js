import gql from 'graphql-tag'

export const preSignUrlsMutation = gql`
  mutation($input: [PreSignedUrlnput]!) {
    preSignUrls(input: $input) {
      url
      type
      filename
    }
  }
`
