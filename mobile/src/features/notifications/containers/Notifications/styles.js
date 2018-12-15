import styled from 'styled-components'
import UiTitle from 'ui/Title'

export const Header = styled(UiTitle)`
  margin-bottom: 20;
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
`
