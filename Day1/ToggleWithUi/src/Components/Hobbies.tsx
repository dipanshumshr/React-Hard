import React from 'react'

type prop = { isPresent: boolean }

function Hobbies({isPresent} : prop) {
  return (
   isPresent ? ( <div>
        <h2>Here as my list of hobbied</h2>
        <ul>
            <li><strong>Cricket</strong></li>
            <li><strong>Travelling</strong></li>
            <li><strong>Cooking Tasty food</strong></li>
        </ul>
    </div>) : null
  )
}

export default Hobbies