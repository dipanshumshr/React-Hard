import { useState } from 'react'
import './App.css'
import Comments from './Comments'

type comment = {
  id: number,
  name: string,
  text: string,
  children?: comment[]
}

function App() {
  const [comments, setComments] = useState<comment[]>([
    {
      id: 1,
      name: "Shepudry",
      text: "Loved this post!",
      children: [
        {
          id: 2,
          name: "Shubhie",
          text: "Same here!",
          children: [
            { id: 3, name: "Pooja", text: "Me too!" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Ritik Bajaj",
      text: "Kinda Mid",
      children: [{
        id: 5,
        name: "Shepudry",
        text: "Tu mid hai bhai"
      }]
    }
  ])

   function editCommentHandler(comments : comment[] , id : number , updatedText : string) : comment[]
  {
    return comments.map(comment => {
      if(comment.id === id)
      {
        return {
          ...comment,
          text : updatedText
        }
      }

      if(comment.children)
      {
        return {
          ...comment,
          children : editCommentHandler(comment.children , id , updatedText)
        }
      }

      return comment
    })
  }

  function handleEdit(id: number, updatedText: string) {
    const updatedComment = editCommentHandler(comments, id , updatedText)

    setComments(updatedComment)
  }


  function addReplyHandler( comments : comment[] , id : number , commentObj : comment) : comment []  {
    return comments.map(comment => {
      if(comment.id === id)
      {
        const updatedCommentlist = [...comment.children || [] , commentObj]

        return {
          ...comment,
          children : updatedCommentlist
        }
      }
      if(comment.children)
      {
        return {
          ...comment,
          children : addReplyHandler(comment.children, id , commentObj)
        }
      }

      return comment
      })
  }

  function handleAddNewReply(ParentId: number, commentObj: comment): void {
    const updatedComment = addReplyHandler(comments , ParentId , commentObj)

    setComments(updatedComment)
  }

  

   const deleteComment = (comments: comment[], id: number): comment[] => {
      const filteredList = comments.filter(comment => comment.id !== id)

      return filteredList.map(comment => {
        if (comment.children) {
          return {
            ...comment,
            children: deleteComment(comment.children, id)
          }
        }

          return comment
      }
      )
    }

  function handleDelete(id: number) {
    const updatedComment = deleteComment(comments, id)

    setComments(updatedComment)
  }

  return (
    <>
      <h1>Here is the post</h1>
      <ul>
        {comments.map(comment => (
          <Comments key={comment.id}
            commentData={comment}
            onChange={handleEdit}
            onAdd={handleAddNewReply}
            onDelete={handleDelete} />
        ))}
      </ul>
    </>
  )
}

export default App
