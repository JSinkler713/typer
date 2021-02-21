import {useState, useEffect, useContext} from 'react'; 

const cleanupWhitespace = (origLine)=> {
    let count = 0;
    while( origLine[count] === ' ') {
      count++
    }
  const cleanedLine = origLine.slice(count, origLine.length)
  console.log(cleanedLine, count)
  return [cleanedLine, count]
}

  
export default cleanupWhitespace
    

