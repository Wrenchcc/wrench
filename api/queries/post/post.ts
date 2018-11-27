import posts from 'api/fixtures/posts'

export default (root, args, ctx, info) => ({
  ...posts()[0],
})
