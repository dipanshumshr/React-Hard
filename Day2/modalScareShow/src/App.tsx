import React, { useEffect, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Modal from './Modal'; // 👈 Import the modal

type FormObj = {
  id: string,
  name: string,
  text: string
};

const initialFormArray: FormObj[] = Array.from({ length: 100 }, (_, index) => ({
  id: nanoid(6),
  name: `user ${index}`,
  text: `This is message number ${index}`
}));

function App() {
  const [formItems, setFormItems] = useState<FormObj[]>(initialFormArray);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [startLimit, setStartLimit] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const [visibleArray, setVisibleArray] = useState<FormObj[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<FormObj | null>(null);

  useEffect(() => {
    const newArray = formItems.slice(startLimit, startLimit + itemPerPage);
    setVisibleArray(newArray);
  }, [startLimit, itemPerPage, formItems]);

  const totalPages = Math.ceil(formItems.length / itemPerPage);

  function handlePrevious() {
    if (pageNum === 1) return;
    setStartLimit(prev => prev - itemPerPage);
    setPageNum(prev => prev - 1);
  }

  function handleNext() {
    if (pageNum === totalPages) return;
    setStartLimit(prev => prev + itemPerPage);
    setPageNum(prev => prev + 1);
  }

  function handleEdit(item: FormObj) {
    setIsModalOpen(true);
    setCurrentItem(item);
  }

  function handleSave(id: string, updatedObj: FormObj) {
    setFormItems(prevItems =>
      prevItems.map(item => (item.id === id ? updatedObj : item))
    );
    handleCloseModal();
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setCurrentItem(null);
  }

  return (
    <>
      <h1>Here is the list of items</h1>
      <div>
        <h3>Items per page:</h3>
        <input type="number" value={itemPerPage} onChange={(e) => setItemPerPage(Number(e.target.value) || 10)} />
      </div>

      {visibleArray.map(value => (
        <div style={{ borderRadius: 20, border: "2px solid red", margin: 10, padding: 5 }} key={value.id}>
          <p><strong>{value.name}</strong></p>
          <p>{value.text}</p>
          <button onClick={() => handleEdit(value)}>Edit</button>
        </div>
      ))}

      <div>
        <button onClick={handlePrevious} disabled={pageNum === 1}>Previous</button>
        <span> Page {pageNum} of {totalPages} </span>
        <button onClick={handleNext} disabled={pageNum === totalPages}>Next</button>
      </div>

      {isModalOpen && currentItem && (
        <Modal
          data={currentItem}
          onChange={handleSave}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;