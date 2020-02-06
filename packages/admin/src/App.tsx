// @ts-nocheck
import React from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Header from './components/Header'
import Panel from './components/Panel'
import Dashboard from './pages/dashboard'

import './styles.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.wrench.cc/graphql',
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Panel />

      <Router>
        <Switch>
          <Route path="/Posts">
            <Posts />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

function Posts() {
  return (
    <Layout title="Posts">
      <h2>Posts</h2>
    </Layout>
  )
}

function Users() {
  return (
    <Layout title="Users">
      ><h2>Users</h2>
    </Layout>
  )
}

export default App
