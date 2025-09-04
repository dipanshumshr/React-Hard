import React, { use, useState } from 'react'
import './App.css'


type Form = {
  name : string,
  email : string,
  Tweet : string
}

function App() {
  const [count, setCount] = useState<Form>({
    name : "",
    email : "",
    Tweet : ""
  })
  const [history , setHistory] = useState<Form[]>([])
  const [future , setFuture] = useState<Form[]>([])



  function handleChange(e : React.ChangeEvent<HTMLInputElement>)
  {
    const {name , value} = e.target

    const lastItem = {...count}
    setHistory(prev => ([...prev, lastItem]))
    setFuture([])
    setCount(prev => ({...prev, [name] : value}))
  }

  function handleHistory()
  {
    const lastItem = history[history.length - 1]

    setFuture(prev => [...prev, count])
    setCount(lastItem)
    setHistory(prev => prev.slice(0,-1))
  }

  function handleFuture()
  {
    const lastItem = future[future.length -1]

    setHistory(prev => [...prev, count])
    setCount(lastItem)
    setFuture(prev => prev.slice(0,-1))
  }

  return (
    <>
      <div>
        <label>Name</label>
        <input type='text' name='name' value ={count.name} onChange={handleChange}/>
        <label>Email</label>
        <input type='text' name='email' value ={count.email} onChange={handleChange}/>
        <label>Tweet</label>
        <input type='text' name='Tweet' value ={count.Tweet} onChange={handleChange}/>
      </div>

      <div>
        <button onClick={handleHistory}>Undo</button>
        <button onClick={handleFuture}>Redo</button>
      </div>
    </>
  )
}

export default App
