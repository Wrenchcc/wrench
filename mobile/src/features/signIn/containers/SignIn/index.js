import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { logo } from 'images'
import video from 'videos/splash.mp4'
import { AppStateConsumer } from 'AppState'
import Facebook from '../../components/Facebook'
import { Base, Inner, Content, Video, Icon, Description, Headline, Legal } from './styles'

const SignIn = ({ t }) => (
  <AppStateConsumer>
    {({ changeLoginState }) => (
      <Base>
        <Video source={video} muted resizeMode="cover" repeat paused={__DEV__} />
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
          <Facebook changeLoginState={changeLoginState} />
          <Legal />
        </Inner>
      </Base>
    )}
  </AppStateConsumer>
)

export default withLocalization(SignIn, 'SignIn')
