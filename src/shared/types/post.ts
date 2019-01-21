export interface Post {
  body: string
  id: number
  title: string
  userId: number
  comments: Comments[]
}

export interface Comments {
  body: string
  postId: number
  name: string
  email: string
  id: number
}
