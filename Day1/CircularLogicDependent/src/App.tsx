import './App.css'
import { useState } from 'react'
import CheckBox from './CheckBox'



type checkedState = {
  isChecked : boolean , disabled : boolean , reason ?: string
}

type ToggleKey = "A" | "B" | "C"

type ToggleRule = {
  disables?: ToggleKey[],
  enables?: ToggleKey[],
  reason?: string
}



const TOGGLE_RULES : Record<ToggleKey , ToggleRule > = {
  "A": { disables: ['B'], reason: 'A disables B' },
  "B": { enables: ['A'], reason: 'B enables A' },
  "C": {} // independent
};

type keyToggled = Record<ToggleKey, checkedState>

function App() {


  const[keyToggles , setKeyToggles] = useState<keyToggled>({
    "A" : {isChecked : false , disabled : false},
    "B" : {isChecked : false , disabled : false},
    "C" : {isChecked : false, disabled : false}
  })


  function handleChange(name : keyof ToggleKey , isChecked : boolean )
  {
    setKeyToggles(prevKeyToggles => {
      let newObj = {...prevKeyToggles}

      newObj[name] = {...newObj[name] , isChecked : isChecked}

      let rules = TOGGLE_RULES[name]

      if(rules.disables)
      {
        rules.disables.forEach(key => {
            newObj[key] = {
              ...newObj[key],
              disabled : isChecked
            }
        });
      }
      if(rules.enables)
      {
        rules.enables.forEach(key => {
          newObj[key] = {
            ...newObj[key],
            disabled : !isChecked
          }
        })
      }

      return newObj
    })
  }
  
  return (
    <>
        <div>
          {
          Object.keys(keyToggles).map(key => {
            const checkBoxKey = key as keyof ToggleKey;

            return (
              <CheckBox 
                key={checkBoxKey}
                checkBoxName={checkBoxKey}
                isChecked={keyToggles[checkBoxKey].isChecked}
                isDisabled={keyToggles[checkBoxKey].disabled} 
                onCheck = {handleChange}
              />
            )
          })
        }
        </div>
    </>
  )
}

export default App
