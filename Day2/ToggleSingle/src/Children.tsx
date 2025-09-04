import React, { type JSX } from 'react'

type Child = {
  id : string,
  name : string,
  checked : boolean
}

type childProp = {
    data : Child,
    onChange : ( id : string , Boolean : boolean) => void
}

function Children({data , onChange} : childProp) : JSX.Element {

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const checked = e.target.checked;

        onChange(data.id , checked)
    }
  return (
    <div>
         <label>Children {data.name}</label>
         <input type="checkbox" name={data.name} checked={data.checked} onChange={handleChange}/>
    </div>
  )
}

export default Children