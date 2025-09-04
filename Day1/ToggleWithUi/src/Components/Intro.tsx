import React from 'react'

type prop = { isPresent: boolean }


function Intro({isPresent} : prop) {
  return (
    isPresent ? (<div>
        <h2>Hey there my name is dipanshu</h2>
        <p>Welcome to my page here</p>
    </div>) : null
  )
}

export default Intro