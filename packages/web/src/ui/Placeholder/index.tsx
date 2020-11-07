import React from 'react'
import { withTheme } from 'styled-components'
import ContentLoader from 'react-content-loader'

function LoaderBase({ children, ...props }) {
  return (
    <ContentLoader
      {...props}
      backgroundColor={props.theme.colors.placeholder}
      foregroundColor={props.theme.isDark ? '#242424' : '#DFDFDF'}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {children}
    </ContentLoader>
  )
}

export default withTheme(LoaderBase)
