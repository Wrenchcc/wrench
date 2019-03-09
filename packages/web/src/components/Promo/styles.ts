import styled from 'styled-components'
import UiText from '../../ui/Text'
import { COLORS, DEVICE } from '../../ui/constants'

export const Base = styled.div`
  width: 414px;
  height: 284px;
  border-radius: 1px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.12);
  background: ${props => (props.inverted ? 'transparent' : 'white')};
  position: ${props => (props.sticky ? 'fixed' : 'static')};
  bottom: 40px;
  right: 40px;
  padding: 30px ${props => (props.paddingHorizontal ? 30 : 0)}px;
  box-sizing: border-box;
  z-index: 101;

  @media ${DEVICE.TABLET} {
    display: ${props => (props.inverted ? 'block' : 'none')};
    width: 100%;
    margin: 40px 0 20px;
    padding: 0;
  }
`

export const Description = styled(UiText)`
  margin-top: 8px;
`

export const Icon = styled.img`
  margin-bottom: 20px;
`

export const Close = styled.img`
  position: absolute;
  right: 20px;
  top: 25px;
  cursor: pointer;
`

export const Placeholder = styled.div`
  height: 48px;
  border-radius: 1px;
  border: solid 1px #e6e7e9;
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
      border: solid 1px ${props => (props.inverted ? COLORS.GREY : '#e6e7e9')};
      color: ${COLORS.LIGHT_GREY};
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
`

export const Send = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  color: ${props => props.inverted
    ? (props.success && COLORS.GREEN) || (props.active ? COLORS.WHITE : COLORS.GREY)
    : (props.success && COLORS.GREEN) || (props.active ? COLORS.BLACK : COLORS.GREY)};
  padding: 0;
`
