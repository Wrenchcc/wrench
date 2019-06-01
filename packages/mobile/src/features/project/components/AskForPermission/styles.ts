import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  padding-left: 40;
  padding-right: 40;
  background: black;
`

export const Headline = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Description = styled(UiText)`
  margin-bottom: 30px;
`
