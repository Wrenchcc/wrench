export const updatePostProgress = (_, { data }, { cache }) => {
  cache.writeData({
    data: {
      postProgress: {
        __typename: 'PostProgress',
        ...data,
      },
    },
  })
  return null
}

export const updatePostData = (_, { data }, { cache }) => {
  cache.writeData({
    data: {
      postData: {
        __typename: 'PostData',
        ...data,
      },
    },
  })
  return null
}
