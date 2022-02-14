import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useNavigation, ScrollView } from 'navigation'
import Header from 'navigation/Page/Header'
import { close } from 'images'
import { Icon } from 'ui'
import Legal from '../../components/Legal'
import Facebook from '../../components/Facebook'
import Google from '../../components/Google'
import Apple from '../../components/Apple'

const styles = {
  base: {
    flex: 1,
  },
  row: {
    marginBottom: 15,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
}

function Other() {
  const { dismissModal } = useNavigation()
  const [isAvailable, setAvailable] = useState(false)
  const providers = [<Facebook />, <Google border />]

  async function isAvailableAsync() {
    const isAvailable = await AppleAuthentication.isAvailableAsync()
    setAvailable(isAvailable)
  }

  useEffect(() => {
    isAvailableAsync()
  }, [])

  if (isAvailable) {
    providers.push(<Apple black />)
  }

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [dismissModal])

  return (
    <View style={styles.base}>
      <Header headerLeft={<Icon source={close} onPress={handleDismissModal} />} />
      <ScrollView>
        {providers.map((Provider, i) => (
          <View key={i} style={styles.row}>
            {Provider}
          </View>
        ))}

        <View style={styles.footer}>
          <Legal color="neutral" />
        </View>
      </ScrollView>
    </View>
  )
}

export default Other
