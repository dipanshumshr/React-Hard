import { useState } from 'react'
import './App.css'
import Category from './Category'


type category = {
  id: number,
  name: string,
  checked: boolean
  children?: category[]
}

function App() {

  const [categories, setCategories] = useState<category[]>([
    {
      id: 1,
      name: "Electronics",
      checked: false,
      children: [
        { id: 2, name: "Mobiles", checked: false },
        {
          id: 3,
          name: "Laptops",
          checked: false,
          children: [
            { id: 4, name: "Gaming Laptops", checked: false }
          ]
        }
      ]
    }
  ])

  let depth = 0

  function handleChange(id: number, isChecked: boolean) {
    const updateParents = toggleChildren(id, categories, isChecked)

    const updateChild = toggleParent(updateParents)

    setCategories(updateChild)
  }

 function toggleChildren(id : number , categories : category[] , isChecked : boolean) : category[]
 {
    const updatedChildren = categories.map(child => {
      if(child.id === id)
      {
        const updateAllChildren = (children : category[] | undefined) : category[] | undefined =>
        {
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
          children : toggleChildren( id , child.children , isChecked)
        }
      }

      return child
    })
    return updatedChildren
 }

  function toggleParent(categories: category[]): category[] {
    return categories.map(child => {
      if(!child.children || child.children.length === 0)
      {
        return child
      }

      const updatedParents = toggleParent(child.children)
      const allCheckedChildren = updatedParents.every(child => child.checked)

      return {
        ...child,
        checked : allCheckedChildren,
        children : updatedParents
      }
    })
  }

  return (
    <>
      <h3>All the categories</h3>
      <ul>
        {categories.map(category => (
          <Category key={category.id} categories={category} depth={depth + 1} onChecked={handleChange} />
        ))}
      </ul>
    </>
  )
}

export default App
