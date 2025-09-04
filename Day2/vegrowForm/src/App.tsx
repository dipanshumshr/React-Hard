import React, { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Form from './Form'

type FormData = {
  id : string,
  name : string,
  type : string,
  quantity : number
}


function App() {
  const [FormList, setFormList] = useState<FormData[]>([
    {
      id : nanoid(10),
      name : "",
      type : "Free weight",
      quantity : 0
    }
  ])


  function handleEdit(id : string, updatedObj : FormData)
  {
    setFormList(prev => prev.map(value => value.id === id ? updatedObj : value))
  }

  function handleAdd()
  {
    setFormList(prev => [...prev,  {
      id : nanoid(10),
      name : "",
      type : "",
      quantity : 0
    }])
  }

  function handleRemove(id : string)
  {
    setFormList(prev => prev.filter(item => item.id !== id))
  }

  function handleSubmit(e : React.MouseEvent)
  {
    e.preventDefault()
    console.log(FormList)
  }
  return (
    <>
      <div> 
        <h3>Welcome to vegrow form</h3>
      </div>
      <div>
        {FormList.map(value => (
          <Form key={value.id} data={value} onChange={handleEdit} onAdd = {handleAdd} onDelete = {handleRemove}/>
        ))}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default App
