import { useState } from "react"

type categoryType = {
    id: number,
    name: string,
    checked: boolean,
    children?: categoryType[]
}

type CategoryProp = {
    data: categoryType
    onChange: (id: number , isChecked : boolean) => void
}

function Category({ data, onChange }: CategoryProp) {


    const isChildrenPresent = data.children && data.children.length >0

    const [isClosed, setIsClosed] = useState<boolean>(false)

    function handleCheck(e : React.ChangeEvent<HTMLInputElement>)
    {
        const isCheck = e.target.checked;

        onChange(data.id , isCheck)
    }

    return (<>
        <li>
            <label onClick={() => setIsClosed(prev => !prev)}>{data.name}</label>
            { isChildrenPresent && (!isClosed ? "👉" : "👇")}
            <input type='checkbox' name={data.name} checked={data.checked} onChange={handleCheck} />
        </li>
        {(isClosed && isChildrenPresent) && <ul>
            {data.children?.map(child => (
                <Category key={child.id} data={child} onChange={onChange} />
            ))}
        </ul>}
    </>
    )
}

export default Category