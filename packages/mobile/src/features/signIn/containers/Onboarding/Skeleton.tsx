import React from 'react'
import { ScrollView, View } from 'react-native'
import * as Spacing from 'ui/Spacing'
import Skeleton from 'ui/Skeleton'
import { ITEM_SIZE } from './index'

const COUNT = 4

export const OnboardingSkeleton: React.FC = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <>
          <View key={index} style={{ flexDirection: 'row' }}>
            <Spacing.Horizontally px={20} />
            <Skeleton key={index} height={ITEM_SIZE} width={ITEM_SIZE} radius={0} />
            <Spacing.Vertically px={10} />
            <Skeleton key={index} height={ITEM_SIZE} width={ITEM_SIZE} radius={0} />
          </View>
          <Spacing.Horizontally px={10} />
        </>
      ))}
    </ScrollView>
  )
}

export default OnboardingSkeleton
