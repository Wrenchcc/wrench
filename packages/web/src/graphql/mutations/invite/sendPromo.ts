import gql from 'graphql-tag'

export const SEND_PROMO = gql`
  mutation sendPromo($number: String!) {
    sendPromo(number: $number)
  }
`
