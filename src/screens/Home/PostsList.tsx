import React, { MouseEvent } from 'react'
import { axiosInstance } from '../../shared/utils/axiosInstance'
import { User } from '../../shared/types/user'
import Spinner from '../../shared/components/Spinner'
import { Post } from '../../shared/types/post'
import Posts from './Post'
import './postsList.css'

interface Props {
  user: User
}

interface State {
  posts: Post[]
}

class PostsList extends React.Component<Props, State> {
  state: State = {
    posts: [],
  }

  componentDidMount() {
    const url = `/posts?userId=${this.props.user.id}`
    axiosInstance({
      method: 'get',
      url,
    })
      .then(response => response.data)
      .then((posts: Post[]) => {
        Promise.all(
          posts.map(post =>
            axiosInstance({
              method: 'get',
              url: `/comments?postId=${post.id}`,
            })
          )
        )
          .then(comments => {
            return posts.map((post, i) => ({
              ...post,
              comments: comments[i].data,
            }))
          })
          .then(mergedPosts => this.setState({ posts: mergedPosts }))
      })
  }

  render() {
    return this.state.posts.length === 0 ? (
      <Spinner />
    ) : (
      <div className="postList">
        <h2>Hi! {this.props.user.name}</h2>
        <span style={{ padding: '10px' }}>
          The total number of posts that you have written are:{' '}
          {this.state.posts.length}
        </span>
        {this.state.posts.map(post => (
          <Posts
            title={post.title}
            body={post.body}
            commentCount={post.comments.length}
            comments={post.comments}
            key={post.id}
          />
        ))}
      </div>
    )
  }
}

export default PostsList
