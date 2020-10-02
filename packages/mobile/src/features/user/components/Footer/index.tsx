import React, { useState, useEffect } from 'react'
import codePush from 'react-native-code-push'
import { Text } from 'ui'
import { readableVersion } from 'utils/appVersion'
import { Base } from './styles'
import { isProductionDeploymentKey } from 'utils/codepush'

function Footer() {
  const [version, setVersion] = useState('v1')
  const [deployment, setDeployment] = useState('production')

  useEffect(() => {
    async function getVersion() {
      const result = await codePush.getUpdateMetadata()

      if (result) {
        setDeployment(isProductionDeploymentKey(result.deploymentKey) ? 'production' : 'staging')
        setVersion(result.label)
      }
    }

    getVersion()
  }, [])

  return (
    <Base>
      <Text fontSize={15} color="accent">
        {`v${readableVersion}`}
      </Text>

      <Text fontSize={12} color="accent">
        {`Bundle version: ${version} (${deployment})`}
      </Text>
    </Base>
  )
}

export default Footer
