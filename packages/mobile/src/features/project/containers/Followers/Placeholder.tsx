import React from 'react'
import { ScrollView } from 'react-native'
import UserPlaceholder from 'ui/User/Placeholder'

const COUNT = 10

export const Placeholder: React.FC = () => {
  return (
    <ScrollView>
      {new Array(COUNT).fill({}).map((_, index) => (
        <UserPlaceholder key={index} />
      ))}
    </ScrollView>
  )
}

export default Placeholder
