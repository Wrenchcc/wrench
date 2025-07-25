// @ts-nocheck
import './styles.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useCurrentUserLazyQuery } from '@wrench/common'
import useLocalStorage from './utils/useLocalStorage'
import Header from './components/Header'
import Panel from './components/Panel'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Projects from './pages/Projects'
import Comments from './pages/Comments'
import Edit from './pages/News/Edit'
import News from './pages/News'
import User from './pages/User'
import PushNotifications from './pages/PushNotifications'

function App() {
  const [accessToken] = useLocalStorage('access_token')
  const [loadUser, { data, loading }] = useCurrentUserLazyQuery()

  const [isAuthenticated, setAuthenticated] = useState(!!accessToken)

  useEffect(() => {
    if (isAuthenticated) {
      loadUser()
    }
  }, [isAuthenticated, loadUser])

  if (loading) {
    return null
  }

  return (
    <Router>
      <Header />

      {isAuthenticated && data?.user?.role === 'ADMIN' ? (
        <>
          <Panel setAuthenticated={setAuthenticated} />

          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/comments">
              <Comments />
            </Route>
            <Route path="/news" exact>
              <News />
            </Route>
            <Route path="/news/edit/:id?">
              <Edit />
            </Route>
            <Route path="/push-notifications">
              <PushNotifications />
            </Route>
            <Route path="/user/:username">
              <User />
            </Route>
          </Switch>
        </>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Router>
  )
}

export default App
