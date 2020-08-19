import React from 'react'
import { ScrollView } from 'react-native'
import { CONTENT_INSET } from 'navigation/constants'
import { isAndroid } from 'utils/platform'
import UserPlaceholder from './Placeholder'

const COUNT = 10

const Placeholder = ({ contentInset = isAndroid ? 0 : CONTENT_INSET, marginTop = 0 }) => {
  return (
    <ScrollView
      contentInset={{ top: contentInset }}
      contentContainerStyle={{ paddingHorizontal: 20, marginTop }}
    >
      {new Array(COUNT).fill({}).map((_, index) => (
        <UserPlaceholder key={index} />
      ))}
    </ScrollView>
  )
}

export default Placeholder
