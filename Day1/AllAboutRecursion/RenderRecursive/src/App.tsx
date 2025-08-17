import './App.css'
import Category from './Category'
import { useState } from 'react';

type category = {
  id : number,
  name : string,
  children ?: category[]
}

function App() {
  
  const [isOpen , setIsOpen] = useState(false)

  const categories : category[]  = [
  { id: 1, name: "Electronics", children: [
    { id: 2, name: "Mobiles" },
    { id: 3, name: "Laptops", children: [
      { id: 4, name: "Gaming Laptops" }
    ]}
  ]}
];

function handleIsOpen()
{
  setIsOpen(prev => !prev)
}

  return (
    <>
      <h3>All the categories</h3>
      <ul>
        {categories.map(category => (
          <Category key={category.id} categories = {category} open = {isOpen} onOpen = {handleIsOpen}/>
        ))}
      </ul>
    </>
  )
}

export default App
