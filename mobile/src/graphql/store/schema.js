export default `
  type PostProgress {
    title: String!
    image: String!
  }

  type Offset {
    x: Int!
    y: Int!
  }

  type Image {
    uri: String!
    width: Int!
    height: Int!
    offset: Offset
  }

  type SelectedProject {
    id: ID!
    image: String!,
    title: String!,
    followers: Int!,
  }

  type PostData {
    caption: String
    selectedProject: SelectedProject
    selectedIndex: Int
    selectedFiles: [Image]!
    dropdownOpen: bool!
  }
`
