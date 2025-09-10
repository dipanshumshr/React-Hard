import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState("")
  const [display , setDisplay] = useState("")


  function handleChange(e : React.ChangeEvent<HTMLInputElement>)
  {
    setCount(e.target.value)
  }

  function changeFormat()
  {
    const newFormat = count.toLocaleString("en-IN" ,{
      style : 'currency',
      currency : "INR"
    })
  }
  

  return (
    <>
      <input type="text" value={count} onChange={handleChange}/>
    </>
  )
}

export default App
