import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.TouchableOpacity``

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.View`
  padding-top: 18;
`

export const Title = styled(UiTitle)`
  margin-right: 40;
`

export const Caption = styled(UiText)`
  margin-bottom: 20;
`
