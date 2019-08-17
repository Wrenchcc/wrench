import React, { useCallback } from 'react'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { usePaginatedQuery, ARTICLES_QUERY } from 'gql'
import { Avatar, Title } from 'ui'
import { COLORS } from 'ui/constants'
import Article from 'components/Article'

const renderItem = ({ item }) => <Article {...item.node} />

function Articles({ name, logoUrl, url, id }) {
  const { showModal } = useNavigation()

  const { articles, isFetching, fetchMore, isRefetching, hasNextPage, refetch } = usePaginatedQuery(
    'articles',
    ['articles']
  )(ARTICLES_QUERY, {
    variables: {
      first: !articles ? 2 : 5,
      publisherId: id,
    },
  })

  const navigateToWebview = useCallback(() => {
    showModal(SCREENS.WEBVIEW, { url })
  }, [url])

  return (
    <Page
      headerTitle={name}
      headerRight={
        <Avatar
          onPress={navigateToWebview}
          uri={logoUrl}
          borderWidth={1}
          borderColor={COLORS.DIVIDER}
        />
      }
    >
      <FlatList
        initialNumToRender={2}
        ListHeaderComponent={
          <Title large numberOfLines={0} style={{ marginBottom: 50 }}>
            {name}
          </Title>
        }
        data={articles}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Articles
