import type React from "react"

type ToggleKey = "A" | "B" | "C"

type CheckBox = {
    checkBoxName : ToggleKey
    isChecked : boolean,
    isDisabled : boolean
    onCheck : (name : ToggleKey , isChecked : boolean) => void
}

function CheckBox({checkBoxName , isChecked , isDisabled , onCheck} : CheckBox)
{

    function handleCheck(e : React.ChangeEvent<HTMLInputElement>)
    {
        const  isChecked = e.target.checked

        onCheck(checkBoxName , isChecked)
    }

    return(
        <div>
            <label>{checkBoxName.toUpperCase()} Label </label>
            <input type="checkbox" name = {checkBoxName} disabled ={isDisabled} checked={isChecked} onChange={handleCheck}/>
        </div>
    )
}

export default CheckBox