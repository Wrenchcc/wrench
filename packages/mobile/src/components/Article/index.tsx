import React, { useCallback } from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { Avatar, Title, Icon, Text, Carousel, TimeAgo } from 'ui'
import { Top, Headline, Content, Spacer } from './styles'

function Article({ title, description, files, publisher, url, createdAt }) {
  const { showModal } = useNavigation()
  const navigateToWebview = useCallback(() => {
    showModal(SCREENS.WEBVIEW, { url })
  }, [url])

  const navigateToPublisher = useCallback(() => {
    showModal(SCREENS.WEBVIEW, { url: publisher.url })
  }, [publisher])

  return (
    <>
      <Top>
        <Avatar onPress={navigateToPublisher} uri={publisher.logoUrl} />
      </Top>

      <Content>
        <Headline>
          <Title fontSize={19} onPress={navigateToWebview}>
            {title}
          </Title>
        </Headline>
        <Text
          fontSize={15}
          lineHeight={22}
          color="grey"
          numberOfLines={3}
          onPress={navigateToWebview}
        >
          {description}
        </Text>
      </Content>

      <Spacer />
      <Carousel files={files} onPress={navigateToWebview} />
      <Spacer />

      <TimeAgo date={createdAt} fontSize={11} long />
      <Spacer />
    </>
  )
}

export default Article
