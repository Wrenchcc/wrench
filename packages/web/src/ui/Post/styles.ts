import styled from 'styled-components'
import UiTitle from '../Title'
import UiText from '../Text'
import UiComments from '../Comments'

export const Base = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  margin-bottom: 70px;
`

export const Content = styled.div`
  margin-top: 20px;
  margin-left: 60px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const Title = styled(UiTitle)`
  margin-top: 20px;
`

export const Text = styled(UiText)`
  margin-top: 10px;
`

export const Comments = styled(UiComments)``
