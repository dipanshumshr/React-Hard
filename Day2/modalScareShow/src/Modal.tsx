import React, { useState } from 'react';

type FormObj = {
  id: string,
  name: string,
  text: string
};

type ModalProp = {
  data: FormObj,
  onChange: (id: string, updatedObj: FormObj) => void,
  onCloseModal: () => void
};

function Modal({ data, onChange, onCloseModal }: ModalProp) {
  const [updated, setUpdated] = useState<FormObj>(data);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUpdated(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    onChange(data.id, updated);
  }

  function handleCancel() {
    onCloseModal();
  }

  // Prevents clicks inside the modal from closing it
  function handleModalContentClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className="modal-backdrop" onClick={handleCancel}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <h3>Edit Item</h3>
        <label>Name</label>
        <input type='text' name="name" value={updated.name} onChange={handleChange} />

        <label>Text</label>
        <input type='text' name="text" value={updated.text} onChange={handleChange} />

        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;