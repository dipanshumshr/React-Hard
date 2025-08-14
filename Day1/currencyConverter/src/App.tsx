import React, { useRef, useState, useLayoutEffect } from 'react'
import './App.css'
import { useFormatCurrency } from "./hooks/useFormatCurrency";

function App() {
  const [currencyInput, setCurrencyInput] = useState('')
  const [format, setFormat] = useState('en-US')
  const formatCurrency = useFormatCurrency(format)

  const inputRef = useRef<HTMLInputElement>(null)
  const caretPos = useRef<number | null>(null)

  function handleCurrency(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, selectionStart } = e.target

    const digitsOnly = value.replace(/\D/g, '');

    const rawlengthDifference = digitsOnly.length - currencyInput.length

    const oldFormatlenght = formatCurrency(currencyInput).length
    const newFormatlength = formatCurrency(digitsOnly).length

    const formattedDifference = newFormatlength - oldFormatlenght

    let caretPosition = selectionStart

    if(rawlengthDifference !== 0 && selectionStart !== null)
    {
        caretPosition = selectionStart + (formattedDifference - rawlengthDifference) 
    }

    caretPos.current = caretPosition

    setCurrencyInput(digitsOnly)
  }



  function handleFormatChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFormat = e.target.value
    setFormat(newFormat)
  }

  useLayoutEffect(()=>{
    const input = inputRef.current

    if(input && caretPos.current !== null)
    {
      input.setSelectionRange(caretPos.current, caretPos.current)
    }

    caretPos.current = null
  },[currencyInput,format])

  const digitable = formatCurrency(currencyInput)

  return (
    <>
      <div>
        <input type='text' ref={inputRef} name="payment" value={digitable} onChange={handleCurrency} />
      </div>
      <div>
        <select value={format} onChange={handleFormatChange}>
          <option value="en-US">US</option>
          <option value="de-DE">German</option>
          <option value="en-IN">English India</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>
    </>
  )
}

export default App
