import styled from 'styled-components'
import UiTitle from '../../ui/Title'

export const List = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -40px;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-left: -10px;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
  }
`

export const Title = styled(UiTitle)`
  margin-bottom: 15px;
`
