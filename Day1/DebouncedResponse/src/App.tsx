import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { takenUsername } from "./data.js"

function App() {

  const [username, setUsername] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [debouncedResponse, setDebouncedResponse] = useState<boolean>(false)

  // function matchTheUsername(username : string)
  // {
  //   const matchedResult = takenUsername.filter((users : string)  => users.toLowerCase().includes(username.toLowerCase()))

  //   return matchedResult
  // }

  const matchTheUsername = useCallback((username: string) => {

    const matchedResult = takenUsername.find((users: string) => users === username)
    return matchedResult
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const result = matchTheUsername(username)
      console.log(result)
      setIsLoading(false)
      result ? setDebouncedResponse(true) : setDebouncedResponse(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
      setDebouncedResponse(false)
    }
  }, [username, matchTheUsername])


  return (
    <>
      <div>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        {
          isLoading ? 
          username.trim() !== "" && <p> Checking 🔎...</p> : 
          debouncedResponse ? <p>Already Taken ❌</p> : (username.trim() !== "" && <p>Success 👌😊</p>)
        }
      </div>
    </>
  )
}

export default App
