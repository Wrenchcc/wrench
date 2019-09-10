import React, { useEffect, useState } from 'react'
import { Text } from 'ui'
import { AppVersion } from 'utils/appVersion'
import { Base } from './styles'

function Footer() {
  const [appVersion, setAppVersion] = useState('')

  async function getAppVersion() {
    const version = await AppVersion()
    setAppVersion(version)
  }

  useEffect(() => {
    getAppVersion()
  }, [getAppVersion])

  return (
    <Base>
      <Text fontSize={15} color="light_grey">
        {appVersion}
      </Text>
    </Base>
  )
}

export default Footer
