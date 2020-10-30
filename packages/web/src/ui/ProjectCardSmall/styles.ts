import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'
import UiButton from '../Button'

export const WIDTH = 50
export const HEIGHT = 50

export const Base = styled.div`
  margin-bottom: 15px;
`

export const Inner = styled.div`
  display: flex;
`

export const Content = styled.div`
  margin-left: 10px;
  max-width: 60%;
`

export const Left = styled.div`
  display: flex;
  width: 100%;
`

export const Right = styled.div``

export const ProjectName = styled(UiText)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const Username = styled(UiText)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const Picture = styled(UiImage)`
  height: ${HEIGHT}px;
`

export const Follow = styled(UiButton)`
  padding: 0 15px;
  height: 30px;
`
