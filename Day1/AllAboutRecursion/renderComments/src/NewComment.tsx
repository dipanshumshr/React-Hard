import React, { useState } from 'react'

type comment = {
    id: number,
    name: string,
    text: string,
    children?: comment[]
}

type NewCommentProps = {
    data : comment,
    onSave : (obj : comment) => void
    onClose : () => void
}

function NewComment({onSave , onClose} : NewCommentProps) : React.JSX.Element {

    const [newComment , setNewComment] = useState<comment>({
        id : 0,
        name : "",
        text: "",
    })

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const { name , value} = e.target

        const newObj = {
            ...newComment,
            [name] : value
        }

        setNewComment(newObj)
    }

    function handleSave()
    {
        onSave(newComment)
    }

  return (
    <div>
        <label>Account Name</label>
        <input type='text' name = "name" value={newComment.name} onChange={handleChange}/>
        <label>Enter ID</label>
        <input type="number" name = "id"  value={newComment.id} onChange={handleChange}/>
        <label>Enter your comment</label>
        <input type="text" name = "text" value={newComment.text} onChange={handleChange}/>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}> Cancel </button>
    </div>
  )
}

export default NewComment