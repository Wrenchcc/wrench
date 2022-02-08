export const keyExtractor = (item) => item?.id || item?.node?.id

export const getNodeIdByIndex = (post, index = 0) => {
  return post?.node?.files?.edges[index]?.node?.id
}
