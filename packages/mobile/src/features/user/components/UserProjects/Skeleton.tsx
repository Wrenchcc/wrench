import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Skeleton from 'ui/Skeleton'
import Text from 'ui/Text'

export const UserProjectSkeleton = () => {
  const { t } = useTranslation('user-projects')

  return (
    <View>
      <Text medium fontSize={21}>
        {t('title')}
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 50, marginTop: 20 }}>
        <View>
          <View style={{ width: 120, height: 120, marginRight: 10 }}>
            <Skeleton width={120} height={120} radius="square" />
          </View>
          <Skeleton width={120} height={10} radius="square" style={{ marginTop: 10 }} />
          <Skeleton width={90} height={8} radius="square" style={{ marginTop: 10 }} />
        </View>
        <View>
          <View style={{ width: 120, height: 120, marginRight: 10 }}>
            <Skeleton width={120} height={120} radius="square" />
          </View>
          <Skeleton width={120} height={10} radius="square" style={{ marginTop: 10 }} />
          <Skeleton width={90} height={8} radius="square" style={{ marginTop: 10 }} />
        </View>
        <View>
          <View style={{ width: 120, height: 120, marginRight: 10 }}>
            <Skeleton width={120} height={120} radius="square" />
          </View>
          <Skeleton width={120} height={10} radius="square" style={{ marginTop: 10 }} />
          <Skeleton width={90} height={8} radius="square" style={{ marginTop: 10 }} />
        </View>
      </View>
    </View>
  )
}

export default UserProjectSkeleton
