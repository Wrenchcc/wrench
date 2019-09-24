import gql from 'graphql-tag'

export default gql`
  type PreSignedUrl {
    url: String
    type: String
    id: ID
    filename: String
  }

  input PreSignedUrlsInput {
    type: UploadType!
  }

  input PreSignedUrlInput {
    type: UploadType!
    path: String!
  }

  enum UploadType {
    IMAGE
    VIDEO
  }

  extend type Mutation {
    preSignUrl(input: [PreSignedUrlInput]): PreSignedUrl
    preSignUrls(input: [PreSignedUrlsInput]): [PreSignedUrl]
  }
`
