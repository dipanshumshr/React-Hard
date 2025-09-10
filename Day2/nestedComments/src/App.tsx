import { useState } from 'react'
import './App.css'
import Comment from './Comment'

type Comment = {
  id: number,
  text: string,
  author: string,
  replies: Comment[]
}

function App() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      text: "This is the first comment",
      author: "Alice",
      replies: [
        {
          id: 2,
          text: "Reply to first comment",
          author: "Bob",
          replies: [
            {
              id: 3,
              text: "Nested reply inside Bob’s reply",
              author: "Charlie",
              replies: [] // could go deeper
            }
          ]
        },
        {
          id: 4,
          text: "Another reply to first comment",
          author: "Dave",
          replies: []
        }
      ]
    },
    {
      id: 5,
      text: "Second top-level comment",
      author: "Eve",
      replies: []
    }
  ])

  return (
    <>
      <ul>
        {comments.map(c => <Comment key={c.id} data={c}/>)}
      </ul>
    </>
  )
}

export default App
