import styled from 'styled-components'
import UiButton from 'ui/Button'
import UiTitle from 'ui/Title'
import UiInput from 'ui/Input'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
`

export const Content = styled.ScrollView`
  padding-left: 20;
  padding-right: 20;
`

export const Header = styled.View`
  height: ${HEADER_HEIGHT};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px 20px;
  background-color: ${COLORS.WHITE};
`

export const AddButton = styled(UiButton)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 20;
  margin-right: 20;
  margin-bottom: 20;
`

export const Title = styled(UiTitle)`
  margin-bottom: 40;
`

export const SubTitle = styled(UiTitle)`
  margin-bottom: 25;
`

export const Input = styled(UiInput)``
