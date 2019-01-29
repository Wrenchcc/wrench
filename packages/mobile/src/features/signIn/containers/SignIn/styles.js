import styled from 'styled-components'
import RVideo from 'react-native-video'
import { Legal as UiLegal, Text, Title } from 'ui'
import { COLORS } from 'ui/constants'

export const Base = styled.SafeAreaView`
  flex: 1;
`

export const Icon = styled.Image``

export const Video = styled(RVideo)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Inner = styled.View`
  flex: 1;
  padding: 20px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Headline = styled(Title)`
  color: ${COLORS.WHITE};
`

export const Description = styled(Text)`
  padding-top: 30;
  line-height: 30;
  color: ${COLORS.WHITE};
`

export const Legal = styled(UiLegal)`
  margin-top: 15;
`
