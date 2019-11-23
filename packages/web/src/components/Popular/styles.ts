import styled from 'styled-components'
import UiTitle from '../../ui/Title'
import { DEVICE } from '../../ui/constants'

export const List = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -40px;
  margin-top: 50px;

  @media ${DEVICE.TABLET} {
    flex-direction: row;
    flex-wrap: nowrap;
    margin-left: -10px;
    flex-flow: row nowrap;
    overflow-y: scroll;
    margin-right: -20px;

    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const Title = styled(UiTitle)`
  margin-bottom: 15px;
`
