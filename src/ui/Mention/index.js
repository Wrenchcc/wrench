import React from 'react'
import PropTypes from 'prop-types'
import { filter } from 'ramda'
import { InfiniteList, MentionUser } from 'ui'
import users from 'fixtures/users'

const ITEM_HEIGHT = 70

const Mention = ({ onPress, query }) => (
  <InfiniteList
    defaultPadding
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="none"
    data={filter(a => a.fullName.toLowerCase().includes(query), users)}
    keyExtractor={item => item.id}
    borderSeparator
    renderItem={({ item }) => <MentionUser user={item} onPress={onPress} />}
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
)

Mention.propTypes = {
  onPress: PropTypes.func.isRequired,
  query: PropTypes.string,
}

export default Mention
