import styled from 'styled-components/native'
import { ThemeInterface } from 'ui/types'

type BaseProps = { theme: ThemeInterface }

export const Base = styled.View<BaseProps>`
  border-bottom-color: ${(props) => props.theme.colors.divider};
  border-bottom-width: 1px;
`
