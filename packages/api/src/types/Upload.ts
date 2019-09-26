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

  input PreSignedUrlInput {
    type: UploadType!
    path: String!
  }

  enum UploadType {
    IMAGE
    VIDEO
  }

  extend type Mutation {
    preSignUrls(input: [PreSignedUrlnput]): [PreSignedUrl]
    preSignUrl(input: PreSignedUrlInput!): PreSignedUrl
  }
`
