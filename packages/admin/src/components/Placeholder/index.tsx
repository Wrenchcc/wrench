import ContentLoader from 'react-content-loader'

export const PlaceholderRow = () => (
  <ContentLoader
    height={650}
    width="100%"
    speed={2}
    backgroundColor="#e6e7e9"
    foregroundColor="#f4f4f5"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="55" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="110" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="165" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="220" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="275" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="330" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="390" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="450" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="510" rx="0" ry="0" width="100%" height="35" />
    <rect x="0" y="570" rx="0" ry="0" width="100%" height="35" />
  </ContentLoader>
)

export const PlaceholderBox = () => (
  <ContentLoader
    height={235}
    width={235}
    speed={2}
    backgroundColor="#e6e7e9"
    foregroundColor="#f4f4f5"
  >
    <rect x="0" y="0" rx="0" ry="0" width="235" height="235" />
  </ContentLoader>
)

export const PlaceholderBoxLarge = () => (
  <ContentLoader
    height={390}
    width={390}
    speed={2}
    backgroundColor="#e6e7e9"
    foregroundColor="#f4f4f5"
  >
    <rect x="0" y="0" rx="0" ry="0" width="390" height="390" />
  </ContentLoader>
)
