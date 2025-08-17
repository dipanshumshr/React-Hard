import React, { useState, type JSX } from 'react'

type category = {
    id: number,
    name: string,
    children ?: category[]
}

type ChildrenProp = {
    categories: category
}

function Category({ categories }: ChildrenProp): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const isChildrenPresent = categories.children && categories.children.length;

    function handleToggle() {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <li>
                <div onClick={handleToggle}>
                    {isChildrenPresent && (isOpen ? "👇" : "👉")}
                    {categories.name}
                </div>

                {(isOpen && isChildrenPresent) ? <ul>
                    {categories.children?.map(val => (
                        <Category key={val.id} categories={val} />
                    ))}
                </ul> : null}
            </li>
        </>
    )
}

export default Category