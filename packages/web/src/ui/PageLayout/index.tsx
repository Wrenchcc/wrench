import styled from 'styled-components'
import { DEVICE } from '../../ui/constants'

export const Base = styled.div`
  padding-top: 80px;
  max-width: 650px;
  margin: 0 auto;

  h1 {
    font-size: 30px;
    margin: 0 0 30px 0;
    font-weight: 500;
    color: ${props => props.theme.colors.inverse};
  }

  h2 {
    font-size: 24px;
    margin: 0 0 30px 0;
    font-weight: 500;
    line-height: 30px;
    color: ${props => props.theme.colors.inverse};
  }

  h3 {
    font-size: 20px;
    margin: 0 0 30px 0;
    font-weight: 500;
    color: ${props => props.theme.colors.inverse};
  }

  p {
    margin: 0 0 25px 0;
    line-height: 24px;
    color: ${props => props.theme.colors.inverse};
  }

  ul,
  ol {
    margin: 0 0 30px 0;
    list-style-type: disc;
    display: block;
    padding-inline-start: 25px;
    color: ${props => props.theme.colors.inverse};
  }

  li {
    margin-bottom: 15px;
  }

  strong {
    font-weight: 500;
    color: ${props => props.theme.colors.inverse};
  }

  @media ${DEVICE.TABLET} {
    padding-left: 20px;
    padding-right: 20px;
  }
`
