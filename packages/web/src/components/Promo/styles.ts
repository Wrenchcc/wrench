import styled from 'styled-components'
import { COLORS } from '../../ui/constants'

export const Base = styled.div`
  width: 414px;
  height: 284px;
  border-radius: 1px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 30px;
  box-sizing: border-box;
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

export const Bottom = styled.div`
  display: flex;
  margin-top: 20px;

  .react-tel-input {
    font-family: InterUI;
    font-size: 15px;
    margin-right: 25px;

    .form-control {
      height: 50px;
      border-radius: 1px;
      border: solid 1px #e6e7e9;
      color: ${COLORS.LIGHT_GREY};
      width: 100%;
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
  cursor: pointer;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  color: ${props => (props.success && COLORS.GREEN) || (props.active ? COLORS.BLACK : COLORS.GREY)};
  padding: 0;
`
