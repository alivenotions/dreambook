import React, { FormEvent } from 'react'

interface Props {
  username: string
  isFormValid: boolean
  handleInputChange: (value: string) => void
  submitLoginForm: (username: string) => void
}
function LoginForm(props: Props) {
  function submitForm(event: FormEvent) {
    event.preventDefault()
    const username = (event.target as HTMLFormElement).username.value
    props.submitLoginForm(username)
  }

  return (
    <div className="login-form">
      <header>DreamBook</header>
      <form onSubmit={submitForm}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={props.username}
          onChange={event => props.handleInputChange(event.target.value)}
        />
        <button type="submit" name="login" disabled={!props.isFormValid}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default LoginForm
