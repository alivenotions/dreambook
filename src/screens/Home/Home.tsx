import React from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import { User } from '../../shared/types/user'
import PostsList from './PostsList'

interface State {
  isLoggedOut: boolean
  userDetails: User
}

function Home() {
  const [isLoggedOut, setIsLoggedOut] = React.useState(false)
  const [userDetails] = React.useState<User>(
    JSON.parse(localStorage.getItem('userDetails') as string)
  )

  function logoutHandler() {
    setIsLoggedOut(true)
    localStorage.removeItem('userDetails')
  }

  if (isLoggedOut) {
    return <Redirect to="/" />
  }

  const { username } = userDetails
  return (
    <React.Fragment>
      <Header
        heading="Dreambook"
        username={username as string}
        logoutHandler={() => logoutHandler()}
      />
      <PostsList user={userDetails} />
    </React.Fragment>
  )
}

export default Home
