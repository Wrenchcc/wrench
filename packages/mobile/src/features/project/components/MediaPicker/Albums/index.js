import React, { PureComponent } from 'react'
import { Dimensions, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import * as MediaLibrary from 'expo-media-library'
import withTranslation from 'i18n/withTranslation'
import { logError } from 'utils/sentry'
import { Text, Touchable } from 'ui'
import { COLORS } from 'ui/constants'
import { pathOr, prepend } from 'ramda'

const { height } = Dimensions.get('window')

const PADDING_TOP = 20
const HEIGHT = 100

class Albums extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  state = {
    data: [],
    isLoading: true,
  }

  constructor(props) {
    super(props)

    this.getAlbums()
  }

  getAlbums = async () => {
    try {
      const first = {
        id: null,
        title: this.props.t('Albums:cameraroll'),
      }

      const results = await MediaLibrary.getAlbumsAsync()
      const albums = prepend(first, results)

      const data = await Promise.all(
        albums.map(async album => {
          const result = await MediaLibrary.getAssetsAsync({
            album: album.id,
            first: 1,
          })

          return {
            ...album,
            preview: pathOr(null, ['assets', 0], result),
            totalCount: result.totalCount,
          }
        })
      )

      this.setState({
        data: data.filter(a => a.totalCount > 0).sort((a, b) => a - b),
        isLoading: false,
      })
    } catch (err) {
      logError(err)
    }
  }

  render() {
    const { data, isLoading } = this.state

    if (isLoading) {
      return null
    }

    return (
      <View
        style={{
          height: data.length * HEIGHT + PADDING_TOP * 2,
          minHeight: height,
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: PADDING_TOP,
        }}
      >
        <View
          style={{
            width: 60,
            height: 5,
            backgroundColor: COLORS.LIGHT_GREY,
            borderRadius: 5,
            alignSelf: 'center',
            marginBottom: PADDING_TOP,
          }}
        />
        {data.map(({ id, title, totalCount, preview }) => (
          <View key={id} style={{ height: HEIGHT, width: '100%' }}>
            <Touchable onPress={() => this.props.onPress(id)} style={{ flexDirection: 'row' }}>
              <Image source={preview} style={{ width: 80, height: 80 }} />
              <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                <Text style={{ marginBottom: 5 }}>{title}</Text>
                <Text fontSize={14} color="grey">
                  {totalCount}
                </Text>
              </View>
            </Touchable>
          </View>
        ))}
      </View>
    )
  }
}

export default withTranslation('Albums')(Albums)
