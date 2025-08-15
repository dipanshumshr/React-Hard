import type React from "react";
import type { JSX } from "react";

type Product = {
    id: string,
    name: string,
    quantity: number,
    price: string
}

type FormProps = {
    data: Product,
    onChange: ( id : string , name : keyof Product , value : string | number ) => void,
    onUp : (id : string) => void,
    onDown : (id : string) => void
}

function Form({ data, onChange , onUp , onDown} : FormProps): JSX.Element {

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const {name , value} = e.target

        onChange(data.id , name as keyof Product , value)
    }

    return <div>
        <div>
            <label>Enter Name</label>
            <input type="text" name="name" value={data.name} onChange={handleChange}/>
            <label>Enter quantity</label>
            <input type="number" name="quantity" value={data.quantity} onChange={handleChange}/>
            <label>Price</label>
            <input type="text" name="price" value={data.price} onChange={handleChange}/>
        </div>
        <div>
            <button onClick={()=> onUp(data.id)}>Up</button>
            <button onClick={()=> onDown(data.id)}>Down</button>
        </div>
    </div>
}

export default Form;