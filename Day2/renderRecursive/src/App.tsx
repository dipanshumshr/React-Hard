import { useState } from 'react'

import "./App.css"
import Category from './Category'

type categoryType = {
  id : number,
  name : string,
  checked : boolean,
  children ?: categoryType[]
}

function App() {
  const [category, setCategory] = useState<categoryType[]>([
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

  function handleChange(id : number , isChecked : boolean)
  {
    const updatedChildren = toggleChildren( id , category , isChecked)

    const updatedParents = toggleParent(updatedChildren)

    setCategory(updatedParents)
  }

  function toggleChildren( id : number , category : categoryType[] , isChecked : boolean) : categoryType[]
  {
      const updatedChildren = category.map((child) : categoryType => {
        if(child.id === id)
        {
          const checkAllChildren = (children : categoryType[] | undefined) : categoryType[] | undefined => {
              return children?.map(child => ({
                ...child,
                checked : isChecked,
                children : checkAllChildren(child.children) 
              }))
          }

          return {...child,
            checked : isChecked,
            children : checkAllChildren(child.children)
          }
        }
        else if(child.children)
        {
          return {
            ...child,
            children : toggleChildren(id , child.children , isChecked)
          }
        }

        return child
      })

      return updatedChildren
  }

  function toggleParent( category : categoryType[]): categoryType[]{
    return category.map(child => {
      if(!child.children || child.children?.length === 0)
      {
        return child
      }

      const updatedParent = toggleParent(child.children)
      const allChildrenToggled = updatedParent.every(child => child.checked)

      return {
        ...child,
        checked : allChildrenToggled,
        children : updatedParent
      }

    })
  }

  return (
    <>
     <div>
        <h3>CheckOut the Categories</h3>
        <ul>
          {category.map(child => (
            <Category key={child.id} data = {child} onChange ={handleChange}/>
          )
          )}
        </ul>
     </div>
    </>
  )
}

export default App
