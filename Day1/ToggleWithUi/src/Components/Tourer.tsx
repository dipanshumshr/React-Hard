import React from 'react'

type prop = { isPresent: boolean }


function Tourer({ isPresent }: prop) {
  return (
    isPresent ? (<div>
        <h2> This is my tourist guide 101</h2>
        <ul>
            <li><strong>Pack your bags well</strong></li>
            <li><strong>Bring some food to desert locations</strong></li>
            <li><strong>Sleep in a cave</strong></li>
        </ul>
    </div>) : null ) 
}

export default Tourer