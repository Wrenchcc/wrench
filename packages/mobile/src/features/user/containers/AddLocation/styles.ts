import styled from 'styled-components'
import { hasNotch } from 'utils/platform'
import UiText from 'ui/Text'

export const Footer = styled.View`
  position: absolute;
  bottom: ${hasNotch ? 40 : 20};
  left: 20;
  right: 20;
`

export const Information = styled.View`
  margin-top: 50;
`

export const Row = styled.View`
  margin-top: ${props => (props.first ? 30 : 0)};
`

export const Counter = styled(UiText)`
  position: absolute;
  right: 0;
  top: 20;
`
