import styled from 'styled-components'
import UiText from 'ui/Text'

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.View`
  padding-top: 18;
`

export const Headline = styled.View`
  flex: 1;
  padding-right: 10;
`

export const Caption = styled(UiText)`
  margin-bottom: 20;
`
