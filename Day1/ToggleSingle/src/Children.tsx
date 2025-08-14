import React from 'react'

type Child = {
  id : string,
  checked : boolean
}

type ChildProps = {
    data : Child,
    onChange : (id : string , boolean : boolean) => void
}

function Children({data , onChange} : ChildProps) {

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const boolean = e.target.checked
        onChange( data.id , boolean)
    }
  return (
    <div>
        <input type='checkbox' checked={data.checked} onChange={handleChange} />
    </div>
  )
}

export default Children