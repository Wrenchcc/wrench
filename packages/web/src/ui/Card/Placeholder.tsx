import ContentLoader from 'ui/Placeholder'
import { Base } from './styles'

export const Placeholder = () => {
  return (
    <Base marginLeft={40}>
      <ContentLoader height={275} width={235} style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" rx="0" ry="0" width="235" height="235" />
        <rect x="0" y="245" rx="0" ry="0" width="135" height="13" />
        <rect x="0" y="265" rx="0" ry="0" width="185" height="10" />
      </ContentLoader>
    </Base>
  )
}

export default Placeholder
