import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const[history , setHistory] = useState<string[]>([])
  const[future, setFuture] = useState<string[]>([])

  const isUndoRedo = useRef(false)

  useEffect(()=>{

    if(isUndoRedo.current)
    {
      isUndoRedo.current = false
      return
    }

    
    const timer = setTimeout(()=>{
      if(text && text !== history[history.length-1])
      {
        setHistory(prev => [...prev,text])
        setFuture([])
      }
    },500)

    return() => {
      clearTimeout(timer)
    }
  },[text , history])

  function handleChange(e : React.ChangeEvent<HTMLInputElement>)
  {
    const textValue = e.target.value;

    console.log(history , future , text)

    setText(textValue)
  }

  function handleHistory()
  {
    if(history.length === 0)
    {
      return
    }

    isUndoRedo.current = true

    const lastItem = history[history.length - 1]

    const previousItem = history.length > 1 ? history[history.length -2] : "" 

    setFuture(prev => [...prev, lastItem])
    setText(previousItem)
    setHistory(prev => prev.slice(0,-1))
  }

  function handleFuture()
  {
    if(future.length === 0)
    {
      return
    }

    isUndoRedo.current = true
    
    console.log(history , future , text)
    const lastItem = future[future.length -1]

    setHistory(prev => [...prev, lastItem])
    setText(lastItem)
    setFuture(prev => prev.slice(0,-1))
  }

  return (
    <>
      <h1>
        Undo and Redo Form
      </h1>
      <input type="text" name="text" value={text} onChange={handleChange}/>

      <button onClick={handleHistory}>Undo</button>

      <button onClick={handleFuture}>Redo</button>
    </>
  )
}

export default App
