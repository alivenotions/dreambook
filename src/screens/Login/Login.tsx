import React, { FormEvent } from 'react'
import LoginForm from './LoginForm'
import { axiosInstance } from '../../shared/utils/axiosInstance'
import { Redirect } from 'react-router'

class Login extends React.Component {
  state = {
    username: '',
    isUsernameValid: false,
    isFormValid: false,
    isAuthorized: false,
  }

  componentDidMount() {
    const username = localStorage.getItem('userDetails')
    if (username) {
      this.setState({ isAuthorized: true })
    }
  }

  // The next two methods may seem unnecessary right now
  // but if the form grows and more validations are required
  // then this decoupling would help there.
  validateUsername = () => {
    this.setState(
      {
        isUsernameValid: !!this.state.username,
      },
      this.validateForm
    )
  }

  validateForm = () => {
    this.setState({
      isFormValid: this.state.isUsernameValid,
    })
  }

  handleInputChange = (value: string) => {
    this.setState({ username: value }, this.validateUsername)
  }

  submitForm = (event: FormEvent) => {
    event.preventDefault()
    const username = (event.target as HTMLFormElement).username.value
    this.authentication(username)
  }

  authentication = (username: string) => {
    const url = `/users?username=${username}`
    axiosInstance({
      method: 'get',
      url,
    })
      .then(response => response.data)
      .then(userDetails => {
        if (userDetails[0] !== undefined) {
          localStorage.setItem('userDetails', userDetails[0])
          this.setState({ isAuthorized: true })
        } else {
          console.log('Not authorized')
        }
      })
  }

  render() {
    const { username, isFormValid, isAuthorized } = this.state
    return !!isAuthorized ? (
      <Redirect to={'/home'} />
    ) : (
      <LoginForm
        username={username}
        isFormValid={isFormValid}
        handleInputChange={this.handleInputChange}
        submitLoginForm={this.submitForm}
      />
    )
  }
}

export default Login
