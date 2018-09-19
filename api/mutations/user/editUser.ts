import user from '../../fixtures/generateUser'

export default (_, args, ctx) => ({
  ...user(),
  interestedIn: [
    {
      id: '123',
    },
  ],
})
