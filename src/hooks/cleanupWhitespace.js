import {useState, useEffect, useContext} from 'react'; 

const cleanupWhitespace = (origLine)=> {
    let count = 0;
    console.log('***********************')
    console.log('original line')
    console.log(origLine)
    console.log('***********************')
    while( origLine[count] === ' ') {
      count++
    }
  const cleanedLine = origLine.slice(count, origLine.length)
  if (cleanedLine == undefined) {
    console.log('hello')
  }
  console.log(cleanedLine, count)
  return [cleanedLine, count]
}

  
export default cleanupWhitespace
    

