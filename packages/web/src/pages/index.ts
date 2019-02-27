import React, { Fragment } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Seo from '../utils/seo'

const responseFacebook = response => {
  console.log(response)
}

const onClick = response => {
  console.log(response)
}

export default function Home() {
  return (
    <Fragment>
      <Seo
        config={{
          title: 'Feed',
        }}
      />
      <FacebookLogin
        appId="1174076712654826"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        render={({ onClick }) => <button onClick={onClick}>Login with Facebook2</button>}
      />
    </Fragment>
  )
}
