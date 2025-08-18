import { useState } from 'react'
import './App.css'
import Subject from './Subject'

type SubjectObj = {
  id : number,
  name : string,
  checked : boolean,
  children ?: Subject[]
}

function App() {
  const [child, setChild] = useState<SubjectObj[]>([
  {
    id: 1,
    name: "School of Engineering",
    checked: false,
    children: [
      {
        id: 2,
        name: "Computer Science",
        checked: false,
        children: [
          { id: 3, name: "Data Structures", checked: false },
          { id: 4, name: "Operating Systems", checked: false }
        ]
      },
      {
        id: 5,
        name: "Mechanical Engineering",
        checked: false,
        children: [
          { id: 6, name: "Thermodynamics", checked: false },
          { id: 7, name: "Fluid Mechanics", checked: false }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "School of Arts",
    checked: false,
    children: [
      {
        id: 9,
        name: "History",
        checked: false,
        children: [
          { id: 10, name: "Modern History", checked: false }
        ]
      },
      {
        id: 11,
        name: "Philosophy",
        checked: false,
        children: [
          { id: 12, name: "Ethics", checked: false },
          { id: 13, name: "Logic", checked: false }
        ]
      }
    ]
  }
])

function handleChange(id : number , isChecked : boolean)
{
  const updatedChildren = toggleChildren(id , isChecked , child )

  const updatedParents = toggleParents(updatedChildren)

  setChild(updatedParents)
}

function toggleChildren(id : number , isChecked : boolean , children : Subject[]) : Subject[]
{
    return children.map(child => {
      if(child.id === id){
        const updateAllChildren = (children : Subject[] | undefined) : Subject[] | undefined => {
          return children?.map(child => ({
            ...child,
            checked : isChecked,
            children : updateAllChildren(child.children)
          }))
          }
          return {
            ...child,
            checked : isChecked,
            children : updateAllChildren(child.children)
        }
      }
      if(child.children)
        {
          return {
            ...child,
            children : toggleChildren(id , isChecked , child.children)
          }
        }

        return child
    })
}

function toggleParents(children : Subject[]) : Subject[]
{
    return children.map(child => {
      if(!child.children || child.children.length === 0)
      {
        return child
      }

      const updatedChildren = toggleParents(child.children)

      const allCheckedChildren = updatedChildren.every(child => child.checked)

      return {
        ...child,
        checked : allCheckedChildren,
        children : updatedChildren
      }
    }
    )
}

  return (
    <>
        <div>
          <ul>
            {child.map(c => (
              <Subject key={c.id} course={c} onChecked = {handleChange}/>
            ))}
          </ul>
        </div>
    </>
  )
}

export default App
