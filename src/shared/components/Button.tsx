import React, { MouseEvent } from 'react'
import './button.css'
const Button = ({
  name,
  // this signifies a no-op
  handler,
  value,
}: {
  name: string
  value: string
  handler: (event: MouseEvent) => void
}) => {
  return (
    <button name={name} onClick={event => handler(event)}>
      {value}
    </button>
  )
}

export default Button
