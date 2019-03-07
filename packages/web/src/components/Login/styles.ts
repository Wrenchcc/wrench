import styled from 'styled-components'
import UiText from '../../ui/Text'
import { COLORS } from '../../ui/constants'

export const Base = styled.div`
  margin-top: 30px;
`

export const Description = styled(UiText)`
  margin-top: 15px;
  margin-bottom: 60px;
`

export const FacebookButton = styled.button`
  background: ${COLORS.FACEBOOK};
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
`
