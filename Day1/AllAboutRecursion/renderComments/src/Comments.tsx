import React, { useState } from 'react'
import NewComment from './NewComment'

type comment = {
    id: number,
    name: string,
    text: string,
    children?: comment[]
}

type commentProp = {
    commentData: comment,
    onChange: (id : number, updatedText : string) => void,
    onAdd: (ParentId : number, comment : comment) => void,
    onDelete: (id : number) => void
}

function Comments({ commentData, onChange, onAdd, onDelete }: commentProp): React.JSX.Element {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editableText, setEditableText] = useState<string>(commentData.text)
    const [isAddActivated, setIsAddActivated] = useState(false)
    const [newObj, setNewObj] = useState<comment>({
        id: 0,
        name: "",
        text: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditableText(e.target.value)
    }

    function handleEdit() {
        setIsEdit(true)
    }

    function handleSave() {
        setIsEdit(false)
        onChange(commentData.id , editableText)
    }

    function handleAddComment(newObj : comment) {
        onAdd(commentData.id , newObj)
         setIsAddActivated(false);
         setNewObj(newObj)
    }

    function handleDelete() {
        onDelete(commentData.id)
    }

    return (
        <>
            <li>
                <h5>{commentData.name}</h5>
                {isEdit ? <input type='text' value={editableText} onChange={handleChange} /> : <h3>{commentData.text}</h3>}
                <button onClick={isEdit ? handleSave : handleEdit}>{isEdit ? "Save 👍" : "Edit ✏️"}</button>
                <button onClick={() => setIsAddActivated(true)}>Reply 🪃</button>
                <button onClick={handleDelete}>Delete ❌</button>
                <ul>
                    {
                        commentData.children?.map(child => (
                            <Comments key={child.id} commentData={child} onChange={onChange} onAdd={onAdd} onDelete={onDelete} />
                        ))
                    }
                </ul>
            </li>
            {isAddActivated && <NewComment data={newObj} onSave={(newObj) => handleAddComment(newObj)} onClose={() => setIsAddActivated(false)}/> }
        </>
    )
}

export default Comments