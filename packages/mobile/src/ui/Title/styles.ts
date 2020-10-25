import styled from 'styled-components/native'
import { FONTS } from 'ui/constants'
import { ThemeInterface } from 'ui/types'

type BaseProps = { color?: string; medium?: boolean; large?: boolean; theme: ThemeInterface }

export const Base = styled.Text<BaseProps>`
  font-family: ${FONTS.MEDIUM};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.inverse};
  font-size: ${({ medium, large }) => (medium && 36) || (large && 48) || 21}px;
`
