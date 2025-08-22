import './App.css'
import { nanoid } from 'nanoid'
import { FixedSizeList } from 'react-window';
import Row from "./Row"
import { useState } from 'react';


type item = {
  id: string,
  text: string,
  checked: boolean
}

const items: item[] = Array.from({ length: 1000 }, (_, index) => ({
  id: nanoid(10),
  text: `This is a list item ${index}`,
  checked: false
}))

function App() {

  const [arrayList , setArrayList] = useState<item[]>(items)
  const [visibleLimit , setVisibleLimit] = useState({startIndex : 0 , stopIndex : 0})

  function handleChanges(id : string , updatedText : string)
  {
    setArrayList(prev => {
     return prev.map(item=> item.id === id? {...item , text : updatedText} : item)
    })
  }

  function toggleCheckBox(id : string)
  {
    setArrayList(prev => {
      return prev.map(item => item.id === id? {...item, checked : !item.checked} : item)
    })
  }

  function selectAll()
  {
    setArrayList(prev => prev.map(value => ({
      ...value,
      checked: !value.checked
    })))
  }

  function selectionVisible()
  {
    setArrayList(prev => 
      prev.map((val , index) => {
        if(index>= visibleLimit.startIndex && index<= visibleLimit.stopIndex)
        {
          return {...val, checked : !val.checked}
        }
        return val
      })
    )
  }

  return (
    <>
      <FixedSizeList
        height={500}
        width={700}
        itemCount={1000}
        itemSize={100}
        itemData={{
          arrayList,
          handleChanges,
          toggleCheckBox
        }}
        onItemsRendered ={({ visibleStartIndex , visibleStopIndex}) => {
          setVisibleLimit({startIndex : visibleStartIndex, stopIndex : visibleStopIndex})
        }}
      >
        {Row}
      </FixedSizeList>

      <button onClick={selectAll}>Select ALL</button>
      <button onClick={selectionVisible}>Select Current</button>

    </>
  )
}

export default App
