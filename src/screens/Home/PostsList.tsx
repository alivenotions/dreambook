import React from 'react'
import { axiosInstance } from '../../shared/utils/axiosInstance'
import { User } from '../../shared/types/user'
import Spinner from '../../shared/components/Spinner'
import { Post } from '../../shared/types/post'
import Posts from './Post'
import './postsList.css'

interface Props {
  user: User
}

function PostsList(props: Props) {
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const url = `/posts?userId=${props.user.id}`
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
          .then(mergedPosts => setPosts(mergedPosts))
      })
  }, [])

  return posts.length === 0 ? (
    <Spinner />
  ) : (
    <div className="postList">
      <h2>Hi! {props.user.name}</h2>
      <span style={{ padding: '10px' }}>
        The total number of posts that you have written are: {posts.length}
      </span>
      {posts.map(post => (
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

export default PostsList
