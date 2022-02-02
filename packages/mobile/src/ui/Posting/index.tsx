import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { FILE_TYPES } from 'utils/enums'
import { Base, Inner, Image, Video } from './styles'

const renderPreviewType = (file) => {
  switch (file.type) {
    case FILE_TYPES.VIDEO: {
      return <Video source={file} resizeMode="cover" isMuted />
    }
    default:
      return <Image source={file} fadeDuration={0} />
  }
}
function Posting({ file }) {
  const { t } = useTranslation('posting')

  return (
    <Base>
      <Inner>
        {renderPreviewType(file)}
        <Text fontSize={15}>{t('description')}</Text>
      </Inner>
    </Base>
  )
}

export default Posting
