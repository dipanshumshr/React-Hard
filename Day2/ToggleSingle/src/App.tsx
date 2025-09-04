import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { nanoid } from 'nanoid'
import Children from './Children'

type Child = {
  id : string,
  name : string,
  checked : boolean
}

function App() {

  const [childList, setChildList] = useState<Child[]>([
    {
      id : nanoid(6),
      name : "a",
      checked : false
    },
    {
      id : nanoid(6),
      name : "b",
      checked : false
    },
    {
      id : nanoid(6),
      name : "c",
      checked : false
    },
  ])

  const parentCheck = childList.every(child => child.checked)


  function handleParent(e : React.ChangeEvent<HTMLInputElement>)
  {
    const checked = e.target.checked
    setChildList(prev => prev.map(child => ({...child, checked : checked})))

  }

  function handleChildren(id : string , Boolean : boolean)
  {
    setChildList(prev => {
      const newObj = [...prev]

      const result = newObj.map(child => child.id === id ? {...child, checked : Boolean } : child)

      return result
    })
  }

  return (
    <>
      <div>
        <label>Parent</label>
        <input type="checkbox" name='parent' checked={parentCheck} onChange={handleParent}/>
      </div>
      <div>
        {childList.map(child =>
          <Children key={child.id} data={child} onChange={handleChildren}/>
        )}
      </div>
    </>
  )
}

export default App
