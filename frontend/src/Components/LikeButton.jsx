import React, { useState } from "react";


function LikeButton() {
  const [counter,setCounter] = useState(0)
  function handleClick() {
    setCounter(counter+1)
  }
  return (
    <button onClick={handleClick} style={{ backgroundColor:"slategrey", opacity:"0.5", color:"white",fontSize:"8px", fontSize: "grey", borderRadius:"20px"}}>
      {counter} 
    </button>
  )
}

export default LikeButton