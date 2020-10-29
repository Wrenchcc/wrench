// @ts-nocheck
import styled from 'styled-components'
import UiText from 'ui/Text'
import { COLORS, DEVICE } from 'ui/constants'
import { CloseIcon as UICloseIcon, LogoRoundedIcon as UILogoRoundedIcon } from '@wrench/ui'

export const Base = styled.div`
  width: 414px;
  height: 284px;
  border-radius: 1px;
  box-shadow: 0 4px 10px 0 ${props => props.inline ? 'transparent' : 'rgba(0, 0, 0, 0.12)'};
  background: ${(props) => (props.inverted ? 'transparent' : props.theme.colors.default)};
  position: ${(props) => (props.sticky ? 'fixed' : 'static')};
  bottom: 40px;
  right: 40px;
  padding: 30px ${(props) => (props.paddingHorizontal ? 30 : 0)}px;
  box-sizing: border-box;
  z-index: 101;

  @media ${DEVICE.TABLET} {
    height: auto;
    width: auto;
  }
`

export const Description = styled(UiText)`
  margin-top: 8px;

  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const LogoRoundedIcon = styled(UILogoRoundedIcon)`
  margin-bottom: 20px;
`

export const CloseIcon = styled(UICloseIcon)`
  position: absolute;
  right: 20px;
  top: 25px;
  cursor: pointer;
`

export const Placeholder = styled.div`
  cursor: pointer;
  height: 48px;
  border-radius: 1px;
  border: solid 1px ${(props) => props.theme.colors.divider};
  width: 100%;
  font-size: 15px;
  margin-right: 25px;
  padding-left: 15px;
  display: flex;
  align-items: center;
`

export const Bottom = styled.div`
  display: flex;
  margin-top: 25px;

  .react-tel-input {
    font-family: 'Inter var', system-ui, sans-serif;
    font-size: 15px;
    margin-right: 25px;

    .form-control {
      height: 50px;
      border-radius: 1px;
      border: solid 1px ${(props) => props.inverted ? props.theme.colors.neutral: props.theme.colors.divider};
      color: ${(props) => props.theme.colors.neutral};
      width: 100%;
      background: transparent;
    }

    .flag-dropdown {
      background-color: transparent;
      border: none;
    }

    .selected-flag {
      padding-left: 15px;
    }

    .flag-dropdown:hover .selected-flag {
      background-color: transparent;
      cursor: default;
    }
  }

  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const Send = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  color: ${(props) =>
    props.inverted
      ? (props.success && COLORS.GREEN) || (props.active ? COLORS.WHITE : props.theme.colors.neutral)
      : (props.success && COLORS.GREEN) || (props.active ? COLORS.BLACK : props.theme.colors.neutral)};
  padding: 0;
`
