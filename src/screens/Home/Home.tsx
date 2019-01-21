import React, { MouseEvent } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import { User } from '../../shared/types/user'
import PostsList from './PostsList'

interface State {
  isLoggedOut: boolean
  userDetails: User
}
class Home extends React.Component {
  state: State = {
    isLoggedOut: false,
    userDetails: JSON.parse(localStorage.getItem('userDetails') as string),
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
    const username = userDetails.username
    return (
      <>
        <Header
          heading="DreamBook"
          username={username as string}
          logoutHandler={this.logoutHandler}
        />
        <PostsList user={userDetails} />
      </>
    )
  }
}

export default Home
