import React, { MouseEvent } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import { User } from '../../shared/types/user'

interface State {
  isLoggedOut: boolean
  userDetails: User | {}
}
class Home extends React.Component {
  state: State = {
    isLoggedOut: false,
    userDetails: {},
  }

  componentDidMount() {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userDetails') as string),
    })
  }

  logoutHandler = (event: MouseEvent) => {
    this.setState(
      {
        isLoggedOut: true,
      },
      () => localStorage.removeItem('userDetails')
    )
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to="/" />
    }

    const { userDetails } = this.state
    return (
      <>
        <Header
          heading="DreamBook"
          username={(userDetails as User).username}
          logoutHandler={this.logoutHandler}
        />
      </>
    )
  }
}

export default Home
