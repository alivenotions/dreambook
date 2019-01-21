import React, { MouseEvent } from 'react'
import Button from '../../shared/components/Button'
import './header.css'
import { Link } from 'react-router-dom'

interface Props {
  heading: string
  username: string
  logoutHandler: (event: MouseEvent) => void
}
class Header extends React.Component<Props> {
  render() {
    const { heading, username, logoutHandler } = this.props
    return (
      <header>
        <span id="heading">{heading}</span>
        <span id="details">
          <Link to="/user">{username}</Link>
          <Button name="logout" handler={logoutHandler} value="Logout" />
        </span>
      </header>
    )
  }
}

export default Header
