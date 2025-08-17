import React, { useState, type JSX } from 'react'

type category = {
    id: number,
    name: string,
    checked : boolean,
    children ?: category[]
}

type ChildrenProp = {
    categories: category,
    depth : number,
    onChecked : (id : number , isChecked : boolean) => void
}

function Category({ categories , depth , onChecked }: ChildrenProp): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    

    const isChildrenPresent = categories.children && categories.children.length;

    function handleToggle() {
        setIsOpen(prev => !prev)
    }

    function handleCheck(e : React.ChangeEvent<HTMLInputElement>)
    {
        const isChecked = e.target.checked

        onChecked(categories.id , isChecked)
    }

    return (
        <>
            <li style={{paddingLeft : `${depth * 16}px`}}>
                <div onClick={handleToggle}  >
                    {isChildrenPresent && (isOpen ? "👇" : "👉")}
                    {categories.name}
                    <input type='checkbox' checked ={categories.checked} onChange={handleCheck}/>
                </div>

                {(isOpen && isChildrenPresent) ? <ul>
                    {categories.children?.map(val => (
                        <Category key={val.id} categories={val} depth={depth + 1} onChecked={onChecked}/>
                    ))}
                </ul> : null}
            </li>
        </>
    )
}

export default Category