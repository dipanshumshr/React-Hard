import React, { useState } from 'react'

function Row({ index, style, data }) {

  const {arrayList , handleChanges ,  toggleCheckBox} = data

  const[isEdit, setIsEdit] = useState(false)
  const itemData = arrayList[index]
  const[value ,setValue] = useState(itemData.text)

  function handleSave()
  {
    handleChanges(itemData.id , value)
    setIsEdit(false)
  }

  function handleEdit()
  {
    setIsEdit(true)
  }

  function handleCheckBox(){
    toggleCheckBox(itemData.id)
  }


  return (
    <div style={style}>
      <input type='checkbox' checked={itemData.checked} onChange={handleCheckBox} />
      <input type='text' value={value} disabled = {!isEdit}  onChange={(e)=> setValue(e.target.value)} />
      <button onClick={isEdit ? handleSave : handleEdit}>{isEdit ? "👌" : "✏️" }</button>
    </div>
  )
}

export default Row