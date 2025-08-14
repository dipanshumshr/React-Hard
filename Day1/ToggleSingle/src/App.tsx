import React, { useState } from 'react'

import './App.css'
import { nanoid } from 'nanoid'
import Children from './Children'

type Child = {
  id: string,
  checked: boolean
}

function App() {
  const [childList, setChildList] = useState<Child[]>([{
    id: nanoid(5),
    checked: false
  },
  {
    id: nanoid(5),
    checked: false
  },
  {
    id: nanoid(5),
    checked: false
  }])

  const isAllChecked = childList.every(child => child.checked)  // since on every render value is changing then we should not required two states for parent

  function handleParent(e: React.ChangeEvent<HTMLInputElement>) {
    const boolean = e.target.checked;

    setChildList(prev => prev.map(val =>
      ({ ...val, checked: boolean })
    ))
  }

  function handleChildren(id: string, boolean: boolean) {
    const newChild = {
      id,
      checked: boolean
    }

    const newChildlist = childList.map(child => child.id === id ? newChild : child)


    setChildList(newChildlist)
  }

  return (
    <>
      <div>
        <label>Parent</label>
        <input type='checkbox' checked={isAllChecked} onChange={handleParent} />
      </div>

      <div>
        {childList.map(child => (
          <div key={child.id}>
            <label>Child</label>
            <Children data={child} onChange={handleChildren} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
