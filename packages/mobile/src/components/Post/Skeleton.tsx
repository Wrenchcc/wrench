import React from 'react'
import { View, Dimensions } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'
import { Top, Left, Content } from './styles'

const { width } = Dimensions.get('window')
const GUTTER = 20

export const PostSkeleton = () => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Top>
        <Left>
          <Skeleton width={30} height={30} radius="round" />
          <View style={{ marginLeft: 10 }}>
            <Skeleton width={150} height={10} />
          </View>
        </Left>
      </Top>

      <Content>
        <Skeleton width={'100%'} height={10} />

        <Spacing.Horizontally px={10} />
        <Skeleton width={150} height={10} />

        <Spacing.Horizontally px={20} />
        <Skeleton
          width={'100%'}
          height={width}
          radius="square"
          style={{ marginLeft: -GUTTER, marginRight: -GUTTER }}
        />
      </Content>
    </View>
  )
}

export default PostSkeleton
