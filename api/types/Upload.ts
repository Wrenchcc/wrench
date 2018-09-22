export default `
  type File {
     url: String
     type: String
     id: ID
     filename: String
  }

  input BlahInput {
    filename: String
  }

  extend type Mutation {
		presignUrl(input: [BlahInput] ): [File]
	}
`
