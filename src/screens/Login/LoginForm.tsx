import React, { FormEvent } from 'react'

interface Props {
  username: string
  isFormValid: boolean
  handleInputChange: (value: string) => void
  submitLoginForm: (event: FormEvent) => void
}
function LoginForm(props: Props) {
  return (
    <div className="login-form">
      <header>DreamBook</header>
      <form onSubmit={props.submitLoginForm}>
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
