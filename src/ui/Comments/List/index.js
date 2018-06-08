import React from 'react'
import { navigateToProfile, navigateToComments } from 'navigation'
import withLocalization from 'i18n/withLocalization'
import Text from 'ui/Text'
import { Base, Row, Comment, LoadMore } from './styles'

const List = ({ t, data }) =>
  data && (
    <Base>
      {data.map(({ user, text, id }) => (
        <Row key={id}>
          <Text bold fontSize={15} onPress={() => navigateToProfile({ user })}>
            {`${user.fullName} `}
          </Text>
          <Comment fontSize={15} numberOfLines={1}>
            {text}
          </Comment>
        </Row>
      ))}
      <LoadMore onPress={() => navigateToComments()}>
        <Text fontSize={15} color="light_grey">
          {t('.loadMore', { count: data.length })}
        </Text>
      </LoadMore>
    </Base>
  )

export default withLocalization(List, 'List')
