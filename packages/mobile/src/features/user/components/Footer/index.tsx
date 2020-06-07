import React, { useState, useEffect } from 'react'
import codePush from 'react-native-code-push'
import { Text } from 'ui'
import AppVersion from 'utils/appVersion'
import { Base } from './styles'

function Footer() {
  const [version, setVersion] = useState('v1')

  useEffect(() => {
    async function getVersion() {
      const result = await codePush.getUpdateMetadata()

      if (result) {
        setVersion(result.label)
      }
    }

    getVersion()
  }, [])

  return (
    <Base>
      <Text fontSize={15} color="accent">
        {AppVersion}
      </Text>

      <Text fontSize={12} color="accent">
        {`Bundle version: ${version}`}
      </Text>
    </Base>
  )
}

export default Footer
