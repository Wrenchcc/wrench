import posts from 'fixtures/posts'

// TODO: Check if user data
export default (_, args, ctx) => posts()[0].node
