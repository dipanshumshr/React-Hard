import React from 'react'

type FormData = {
  id : string,
  name : string,
  type : string,
  quantity : number
}

type FormProp = {
    data : FormData,
    onChange : (id : string , updatedObj : FormData) => void,
    onAdd : () => void,
    onDelete : (id : string) => void
}

function Form({data , onChange , onAdd , onDelete} : FormProp) {

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const { name , value } = e.target

        const newObj = {...data , [name] : value }

        onChange(data.id , newObj)
    }

    function handleSelectChange(e : React.ChangeEvent<HTMLSelectElement>){
        const {value} = e.target

        const newObj = {...data , type : value}

        onChange(data.id , newObj)
    }


  return (
    <div>
        <label>Product Name</label>
        <input type='text' name="name" value={data.name} onChange={handleChange}/>

        <label>Product Type</label>
        <select  value={data.type} onChange={handleSelectChange}>
            <option value="Free Weight">Free weight</option>
            <option value="Boxed Weight">Boxed Weight</option>
        </select> 

        <label>Product Quantity</label>
        <input type='number' name="quantity" value={data.quantity} onChange={handleChange}/>

        <div>
            <button onClick={onAdd}>Add</button>
            <button onClick={() => onDelete(data.id)}>Delete</button>
        </div>
    </div>
  )
}

export default Form