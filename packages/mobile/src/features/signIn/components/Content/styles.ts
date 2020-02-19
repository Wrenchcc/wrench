import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.View`
  padding: 0px 20px 50px 20px;
`

export const Headline = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Description = styled(UiText)``

export const Item = styled.View`
  width: 100px;
  height: 100px;
  background-color: red;
`
