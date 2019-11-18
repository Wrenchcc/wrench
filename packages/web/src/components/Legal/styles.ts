import styled from 'styled-components'
import UiText from 'ui/Text'

export const Base = styled.div`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`

export const Text = styled(UiText)`
  opacity: 0.8;
  font-size: 12px;

  a {
    text-decoration: underline;
  }
`
