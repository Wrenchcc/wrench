import styled from 'styled-components'
import UiTitle from '../Title'
import UiComments from '../Comments'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
  max-width: 640px;
  width: 100%;

  @media ${DEVICE.TABLET} {
    width: 100%;
    max-width: 100%;
  }
`
export const Top = styled.div`
  margin-bottom: 20px;
`

export const Bottom = styled.div`
  margin-top: 20px;
`

export const Footer = styled.div`
  flex-direction: row;
  display: flex;
`

export const Title = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Comments = styled(UiComments)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export const Collection = styled.div`
  cursor: pointer;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.divider};
`
