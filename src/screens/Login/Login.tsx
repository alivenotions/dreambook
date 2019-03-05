import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import { axiosInstance } from '../../shared/utils/axiosInstance'
import { Redirect } from 'react-router'

function Login() {
  const [username, setUsername] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      setIsAuthorized(true)
    }
  }, [])

  useEffect(() => {
    validateForm()
  }, [username])

  function validateForm() {
    setIsFormValid(!!username)
  }

  function handleInputChange(value: string) {
    setUsername(value)
    validateForm()
  }

  function submitForm(username: string) {
    authentication(username)
  }

  function authentication(username: string) {
    const url = `/users?username=${username}`
    axiosInstance({
      method: 'get',
      url,
    })
      .then(response => response.data)
      .then(userDetails => {
        if (userDetails[0] !== undefined) {
          localStorage.setItem('userDetails', JSON.stringify(userDetails[0]))
          setIsAuthorized(true)
        } else {
          console.log('Not Authorized')
        }
      })
  }

  return !!isAuthorized ? (
    <Redirect to={'/home'} />
  ) : (
    <LoginForm
      username={username}
      isFormValid={isFormValid}
      handleInputChange={handleInputChange}
      submitLoginForm={submitForm}
    />
  )
}

export default Login
