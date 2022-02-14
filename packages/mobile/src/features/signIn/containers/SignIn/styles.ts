import styled from 'styled-components'
import { Video as RNVideo } from 'expo-av'
import { Text, Title } from 'ui'
import { NAVIGATION } from 'navigation'
import { isAndroid } from 'utils/platform'

export const Base = styled.SafeAreaView`
  flex: 1;
`

export const Icon = styled.Image``

export const Video = styled(RNVideo)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`

export const Overlay = styled.View`
  background: rgba(000, 000, 000, 0.6);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`

export const Inner = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: ${isAndroid ? NAVIGATION.STATUS_BAR_HEIGHT + 20 : 20}px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Headline = styled(Title)`
  color: ${(props) => props.theme.colors.white};
`

export const Description = styled(Text)`
  padding-top: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.white};
`
