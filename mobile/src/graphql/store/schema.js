export default `
  type PostProgress {
    title: String!
    image: String!
  }

  type Image {
    uri: String!
  }

  type SelectedProject {
    id: ID!
    images: [Image]!,
    title: String!,
    followers: Int,
  }

  type PostData {
    caption: String
    selectedProject: SelectedProject
  }
`
