// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import { useTranslation } from 'i18n'
import { useCurrentUserQuery, usePaginatedQuery, FeedDocument } from '@wrench/common'
import Seo from 'utils/seo'
import { Post, Layout, Loader, Avatar, Text } from 'ui'
import { GET_FEED } from 'graphql/queries/feed/feed'
import Onboarding from 'components/Onboarding'
import ProjectSuggestion from 'components/ProjectSuggestion'
import ProjectSuggestionSmall from 'components/ProjectSuggestionSmall'
import Hide from 'components/Hide'
import { Left, Right, Top, Footer, Name, List, ListItem } from './styles'

export default function Home() {
  const { t } = useTranslation(['feed'])
  const { data } = useCurrentUserQuery()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['feed', 'posts'])(FeedDocument, {
    pollInterval: 3000,
    variables: {
      first: 3,
    },
  })

  if (data?.user && !data?.user?.interestedIn.length) {
    return <Onboarding />
  }

  if (!edges?.length) {
    return <ProjectSuggestion />
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('title'),
          description: t('description'),
        }}
      />

      <Left>
        <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
          {edges?.map(({ node }) => (
            <Post data={node} key={node.id} />
          ))}
        </InfiniteScroll>
      </Left>

      <Right>
        <Hide on="tablet">
          <Top>
            <Avatar uri={data.user?.avatarUrl} size={80} />
            <Name>
              <Text medium fontSize={20} lineHeight={28} style={{ marginBottom: 5 }}>
                {data.user?.fullName}
              </Text>
              <Text color="accent" fontSize={15}>
                {t('settings:sections_profile')}
              </Text>
            </Name>
          </Top>

          <ProjectSuggestionSmall />

          <Footer>
            <List>
              <ListItem>
                <Link href="/blog">
                  <a>
                    <Text color="accent" fontSize={12} lineHeight={16}>
                      {t('footer:blog')}
                      {' • '}
                    </Text>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/download">
                  <a>
                    <Text color="accent" fontSize={12} lineHeight={16}>
                      {t('footer:download')}
                      {' • '}
                    </Text>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <a href="mailto:support@wrench.cc">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    {t('footer:mail')}
                    {' • '}
                  </Text>
                </a>
              </ListItem>
              <ListItem>
                <a href="mailto:feedback@wrench.cc">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    {t('footer:feedback')}
                    {' • '}
                  </Text>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://m.me/wrench.cc" rel="nofollow">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    {t('footer:chat')}
                    {' • '}
                  </Text>
                </a>
              </ListItem>
              <ListItem>
                <Link href="/faq">
                  <a>
                    <Text color="accent" fontSize={12} lineHeight={16}>
                      {t('footer:faq')}
                      {' • '}
                    </Text>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/terms">
                  <a>
                    <Text color="accent" fontSize={12} lineHeight={16}>
                      {t('footer:terms')}
                      {' • '}
                    </Text>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <a href="https://instagram.com/wrench.cc" rel="nofollow">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    Instagram
                    {' • '}
                  </Text>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://facebook.com/wrench.cc" rel="nofollow">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    Facebook
                    {' • '}
                  </Text>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://twitter.com/cc_wrench" rel="nofollow">
                  <Text color="accent" fontSize={12} lineHeight={16}>
                    Twitter
                  </Text>
                </a>
              </ListItem>
            </List>

            <Text color="accent" fontSize={12}>
              © Wrench
            </Text>
          </Footer>
        </Hide>
      </Right>
    </Layout>
  )
}
