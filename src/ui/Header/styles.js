import styled from 'styled-components'
import UiSearch from 'ui/Search'
import UiTouchable from 'ui/Touchable'
import UiAdd from 'ui/Add'
import UiText from 'ui/Text'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'
import { isIphoneX } from 'utils/platform'

export const Base = styled.View`
  height: ${HEADER_HEIGHT};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  padding-top: ${(isIphoneX && 40) || 20}
  background-color: ${({ transparent }) => (transparent ? 'transparent' : COLORS.WHITE)};
`

export const Search = styled(UiSearch)`
  flex: 1;
  padding-right: 20;
`

export const Add = styled(UiAdd)`
  width: 20;
`
export const BackButton = styled.TouchableOpacity``

export const Left = styled.View`
  flex: 1;
  align-items: flex-start;
`

export const Center = styled.View`
  flex: 2;
`

export const Right = styled.View`
  flex: 1;
  align-items: flex-end;
`

export const Title = styled(UiText)``

export const Cancel = styled(UiTouchable)``

export const Text = styled(UiText)``
