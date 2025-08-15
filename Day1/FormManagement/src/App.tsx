import { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Form from './component/Form'

type Product = {
  id: string,
  name: string,
  quantity: number,
  price: string
}

function App() {

  const [productList, setProductList] = useState<Product[]>([
    {
      id: nanoid(5),
      name: "",
      quantity: 0,
      price: ""
    }
  ])

  function handleChange( id : string , name : keyof Product , value : string | number)
  {
    setProductList(prev => prev.map(product => product.id === id ? {...product, [name] : value} : product))
  }

  function handleUp(id : string)
  {
    setProductList(prev => {
        const indexOfSelected = prev.findIndex(product => product.id === id)
        const newArray = [...prev]
        const switableElement = newArray[indexOfSelected]
        const prevElement = newArray[indexOfSelected -1]
        if(indexOfSelected>0)
         {
           newArray[indexOfSelected - 1] =  switableElement
           newArray[indexOfSelected] = prevElement

           return newArray
         } 

         return prev
         
    })}

    function handleDown(id : string)
    {
         setProductList(prev => {
        const indexOfSelected = prev.findIndex(product => product.id === id)
        const newArray = [...prev]
        const switableElement = newArray[indexOfSelected]
        const nextElement = newArray[indexOfSelected + 1]
        if( indexOfSelected < newArray.length - 1 )
         {
           newArray[indexOfSelected + 1] =  switableElement
           newArray[indexOfSelected] = nextElement
           return newArray
         } 
       return prev 
    })
    }


    function handleAdd()
    {
      setProductList(prev => ( [...prev , {id : nanoid(5) , name : "" , quantity : 0 , price : ""}]))
    }

    function handleDelete()
    {
      setProductList(prev => prev.slice(0,-1))
    }

    function handleSubmit()
    {
       const isValid = productList.every(product => {
        const priceAsNumber = parseFloat(product.price);

        return product.name.trim() !== "" &&       // 1. Check name after trimming whitespace
               product.quantity > 0 &&
               !isNaN(priceAsNumber) &&            // 2. Check if price is a real number
               priceAsNumber > 0;                  // 3. Check if the price is positive
    });

      if(isValid)
      {
          console.log(productList)
      }
      else
      {
        console.log("empty Values")
      }
    }

  return (
    <>
      {productList ? productList.map(product => (
        <Form key={product.id} data={product} onChange={handleChange} onUp={handleUp} onDown={handleDown} />)) : <p>nothing to show here</p> }

        <div>
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleDelete}>Delete</button>
        </div>

        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
    </>
    )
}

export default App
