import React, { Component } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Login from './screens/Login/Login'
import Home from './screens/Home/Home'

import './App.css'
import UserDetails from './screens/User/User'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/user" component={UserDetails} />
      </Switch>
    </BrowserRouter>
  )
}

function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        !!localStorage.getItem('userDetails') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default App
