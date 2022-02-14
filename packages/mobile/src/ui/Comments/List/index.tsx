import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { slice } from 'rambda'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import ParsedText from 'ui/Text'
import Touchable from 'ui/Touchable'

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  comment: {
    flex: 1,
  },
  load: {
    marginTop: 5,
    marginBottom: 10,
  },
}

function List({ data }) {
  const { t } = useTranslation('comment-list')
  const { navigate } = useNavigation()

  const navigateToComments = useCallback(
    () =>
      navigate(SCREENS.COMMENTS, {
        postId: data.id,
      }),
    [data]
  )

  const renderComment = ({ node }) => {
    const onPress = () => navigate(SCREENS.USER, { user: node.user })

    return (
      <View key={node.id} style={styles.row}>
        <Text bold fontSize={15} onPress={onPress}>
          {`${node.user.fullName} `}
        </Text>
        <ParsedText fontSize={15} numberOfLines={1} lineHeight={22} style={styles.comment}>
          {node.text}
        </ParsedText>
      </View>
    )
  }

  if (!data.comments.edges.length) {
    return null
  }

  return (
    <>
      {slice(0, 2, data.comments.edges).reverse().map(renderComment)}

      <Touchable onPress={navigateToComments} style={styles.load}>
        <Text fontSize={15} color="accent">
          {t('loadMore', { count: data.comments.totalCount })}
        </Text>
      </Touchable>
    </>
  )
}

export default List
