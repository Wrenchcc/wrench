import styled from 'styled-components'

export const Base = styled.div`
  width: 335px;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
  background-color: ${(props) =>
    props.theme.isDark ? props.theme.colors.placeholder : props.theme.colors.default};
  position: absolute;
  right: 0;
  top: 61px;
  z-index: 100;
  display: flex;
  flex-direction: column;

  li {
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.theme.colors.divider};

    &:last-child {
      border: none;

      a {
        color: ${(props) => props.theme.colors.error};
        border: none;
      }
    }
  }
`
