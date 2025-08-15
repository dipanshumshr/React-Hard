import React, { useEffect, useState } from 'react'
import './App.css'

type FormData = {
  name : string,
  email : string,
  age : number
}

function App() {
  const [formInput, setFormInput] = useState<FormData>({
    name : "",
    email : "",
    age : 0
  })

  const[history , setHistory] = useState<FormData[]>([])
  const[item , setItem] = useState<FormData[]>([])

  useEffect(()=>{
    function handleKeyDown(e : KeyboardEvent)
    {
        if((e.ctrlKey || e.metaKey) && e.key === 'x')
        {
          e.preventDefault()
          if(history.length > 0)
          {
            handleHistory()
          }
        }

        else if((e.ctrlKey || e.metaKey) && e.key === 'y')
        {
            e.preventDefault()
            if(item.length > 0)
            {
              handleRedo()
            }
        }}

        window.addEventListener('keydown', handleKeyDown)

        return ()=>{
          window.removeEventListener('keydown', handleKeyDown)
        }
  },[history, item])

  function handleChange(e : React.ChangeEvent<HTMLInputElement>)
  {
      const {name , value } = e.target;

      setHistory(prev => [...prev,formInput])
      setItem([])
      setFormInput(prev => ({...prev,[name] : value}))
  }

  function handleHistory()
  {
    const lastItem = history[history.length -1]

    setItem(prev => ([...prev,formInput]))
    setFormInput(lastItem)
    setHistory(prev => prev.slice(0,-1))
  }

  function handleRedo()
  {
    const lastItem = item[item.length -1]

    setHistory(prev => ([...prev,formInput]))
    setFormInput(lastItem)
    setItem(prev => prev.slice(0, -1))
  }

  return (
    <>
        <div>
          <div> 
            <label>Name</label>
            <input type='text' name = "name" placeholder='Enter Name' value= {formInput.name} onChange={handleChange}/>  
          </div>  

          <div> 
            <label>Email</label>
            <input type='text' name = "email" placeholder='Enter Email' value= {formInput.email} onChange={handleChange}/>  
          </div>  

          <div> 
            <label>Age</label>
            <input type='number' name = "age" value= {formInput.age} onChange={handleChange}/>  
          </div> 

          <div>
            <button disabled = {history.length === 0} onClick={handleHistory}>Undo</button>
            <button disabled={item.length === 0} onClick={handleRedo}>Redo</button>  
          </div> 
        </div>    
    </>
  )
}

export default App
