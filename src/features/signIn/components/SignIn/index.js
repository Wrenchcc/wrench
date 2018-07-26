import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { Facebook } from 'ui'
import { logo } from 'images'
import video from 'videos/splash.mp4'
import { Base, Inner, Content, Video, Icon, Description, Headline, Legal } from './styles'

const SignIn = ({ t }) => (
  <Base>
    <Video source={video} muted resizeMode="cover" repeat />
    <Inner>
      <Icon source={logo} />

      <Content>
        <Headline large numberOfLines={0}>
          {t('.headline')}
        </Headline>
        <Description white fontSize={20}>
          {t('.description')}
        </Description>
      </Content>
      <Facebook />
      <Legal />
    </Inner>
  </Base>
)

export default withLocalization(SignIn, 'SignIn')
