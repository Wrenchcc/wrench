export default `
  type PreSignedUrl {
     url: String
     type: String
     id: ID
     filename: String
  }

  input PreSignedUrlnput {
    filename: String
  }

  extend type Mutation {
		preSignUrls(input: [PreSignedUrlnput]): [PreSignedUrl]
	}
`
