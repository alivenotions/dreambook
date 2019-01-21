import React from 'react'

import './comment.css'

interface Props {
  bodyText: string
  name: string
  email: string
  key: number
}

const Comment = ({ bodyText, name, email, key }: Props) => {
  return (
    <div className="comment" key={key}>
      <span>
        <strong>Comment by</strong>:<span className="highlight">{name}</span> at
        <span className="highlight">{email}</span>
      </span>
      <br />
      <span>
        <strong>Comment</strong>: {bodyText}
      </span>
      <br />
    </div>
  )
}

export default Comment
