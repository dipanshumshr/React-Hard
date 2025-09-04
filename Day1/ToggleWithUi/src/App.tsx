import { useState } from 'react'
import './App.css'
import Intro from "./Components/Intro"
import Hobbies from "./Components/Hobbies"
import Tourer from "./Components/Tourer"


type checklist = {
   introDiv : boolean,
    hobbyDiv : boolean,
    tourerDiv : boolean
}

function App() {
  const [checkListUI, setCheckListUI] = useState<checklist>({
    introDiv : false,
    hobbyDiv : false,
    tourerDiv : false
  })

  function handleChecked(e : React.ChangeEvent<HTMLInputElement>)
  {
    const {name , checked} = e.target

    setCheckListUI(prev => ({
      ...prev,
      [name] : checked
    }))
  }

  return (
    <>
      {
        Object.entries(checkListUI).map(([key, value])=> (
          <input type= "checkbox" key={key} name={key} checked = {value} onChange={handleChecked}/>
        ))
      }
      <Intro isPresent = {checkListUI.introDiv}/>
      <Hobbies isPresent = {checkListUI.hobbyDiv}/>
      <Tourer isPresent = {checkListUI.tourerDiv}/>
    </>
  )
}

export default App
