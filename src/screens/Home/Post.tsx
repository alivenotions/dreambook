import React, { MouseEvent } from 'react'

import { Comments } from '../../shared/types/post'
import Comment from './Comment'

import './post.css'

interface Props {
  title: string
  commentCount: number
  body: string
  comments: Comments[]
}

interface State {
  showComments: boolean
}

class Posts extends React.Component<Props, State> {
  state: State = {
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

export default Posts
