import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './screens/Login/Login'
import Home from './screens/Home/Home'

import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
