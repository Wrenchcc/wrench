import gql from 'graphql-tag'

export default gql`
  type PreSignedUrl {
    url: String
    type: String
    id: ID
    filename: String
  }

  input PreSignedUrlnput {
    type: UploadType!
  }

  enum UploadType {
    IMAGE
    VIDEO
  }

  extend type Mutation {
    preSignUrls(input: [PreSignedUrlnput]): [PreSignedUrl]
  }
`
