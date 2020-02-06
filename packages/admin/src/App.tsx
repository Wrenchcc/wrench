// @ts-nocheck
import './styles.css'
import React from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Panel from './components/Panel'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Projects from './pages/Projects'
import Comments from './pages/Comments'
import Newsletter from './pages/Newsletter'
import PushNotifications from './pages/PushNotifications'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.wrench.cc/graphql',
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Panel />

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
          <Route path="/newsletter">
            <Newsletter />
          </Route>
          <Route path="/push-notifications">
            <PushNotifications />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
