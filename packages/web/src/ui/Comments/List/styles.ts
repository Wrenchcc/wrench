import styled from 'styled-components'
import UiText from '../../Text'

export const Row = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`

export const Comment = styled(UiText)`
  flex: 1;
  margin-left: 5px;
`

export const LoadMore = styled(UiText)`
  margin-top: 10px;
`
