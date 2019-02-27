import React from 'react'

export default function Layout({ children }) {
  return (
    <div
      style={{
        paddingTop: '100px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  )
}
