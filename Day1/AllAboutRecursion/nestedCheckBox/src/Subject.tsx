import React, { useState } from 'react'

type Subject = {
    id: number,
    name: string,
    checked: boolean,
    children?: Subject[]
}

type SubjectProps = {
    course: Subject,
    onChecked : (id : number , isChecked : boolean) => void
}


function Subject({ course , onChecked}: SubjectProps): React.JSX.Element {

    const[isClosed , setIsClosed] = useState(true)

    function handleToggleParent()
    {
        setIsClosed(prev => !prev)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked;
        onChecked(course.id , isChecked)
    }


    return (
        <div>
            <li onClick={handleToggleParent}>
                <label><strong>{course.name}</strong></label>
                <input type='checkbox' checked={course.checked} onChange={handleChange} style={{ display: 'inline' }} />
            </li>
            {isClosed && <ul>
                {course.children?.map((child) => (
                    <Subject key={child.id} course={child} onChecked={onChecked} />
                ))}
            </ul> }
        </div>
    )
}

export default Subject