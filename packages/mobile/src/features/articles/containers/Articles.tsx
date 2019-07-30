import React, { useCallback } from 'react'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { useQuery, ARTICLES_QUERY } from 'gql'
import { Image, Touchable, Carousel, Text } from 'ui'
import { COLORS } from 'ui/constants'

const renderItem = ({ item }) => <Text>{item.node.description}</Text> //<Carousel files={post.files} />

function Articles({ name, logoUrl, url, id }) {
  const { showModal } = useNavigation()
  const { data, loading } = useQuery(ARTICLES_QUERY, {
    variables: {
      publisherId: id,
    },
  })

  const handleWebview = useCallback(() => {
    showModal(SCREENS.WEBVIEW, { url })
  }, [url])

  return (
    <Page
      headerTitle={name}
      headerRight={
        <Touchable onPress={handleWebview}>
          <Image
            source={{ uri: logoUrl }}
            width={30}
            height={30}
            borderRadius={30}
            borderColor={COLORS.DIVIDER}
            borderWidth={1}
          />
        </Touchable>
      }
      headerAnimation={false}
    >
      <FlatList
        initialNumToRender={6}
        data={data.articles && data.articles.edges}
        refetch={() => {}}
        fetchMore={() => {}}
        isRefetching={false}
        isFetching={loading}
        hasNextPage={false}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Articles
