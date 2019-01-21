import React, { MouseEvent } from 'react'

import './post.css'
import { Comments } from '../../shared/types/post'

interface PostProps {
  title: string
  commentCount: number
  body: string
  comments: Comments[]
}

interface PostState {
  showComments: boolean
}

class Posts extends React.Component<PostProps, PostState> {
  state: PostState = {
    showComments: false,
  }

  toggleComments = (event: MouseEvent) => {
    this.setState(prevState => ({
      ...prevState,
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { commentCount, title, body, comments } = this.props
    return (
      <div className="post">
        <h3>{title}</h3>
        <span className="postInfo">with {commentCount} comments</span>
        <p>{body}</p>
        <a className="more" onClick={this.toggleComments}>
          {!this.state.showComments ? 'Show comments' : 'Hide comments'}
        </a>
        <span className="line" />
        {this.state.showComments && (
          <>
            <h4>
              <strong>Comments</strong>
            </h4>
            {comments.map(comment =>
              Comment({
                bodyText: comment.body,
                name: comment.name,
                email: comment.email,
                key: comment.id,
              })
            )}
          </>
        )}
      </div>
    )
  }
}

interface CommentsProps {
  bodyText: string
  name: string
  email: string
  key: number
}

const Comment = ({ bodyText, name, email, key }: CommentsProps) => {
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

export default Posts
