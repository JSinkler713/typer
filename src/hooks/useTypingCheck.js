import {useState, useEffect, useContext} from 'react'; 
import snippets from '../data/snippets.js'
import reactFile from '../files/useTypingCheck.js'

console.log(snippets)


const useTypingCheck = ()=> { 
  const [snippets, setSnippets] = useState([])
  const [littleSentence, setLittleSentence] = useState('')
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [doneSnippets, setDoneSnippets] = useState([])

  const [keydown, setKeyDown] = useState()
  const [endingNum, setEndingNum] = useState(100)
  const [typed, setTyped] = useState([])
  const [notTyped, setNotTyped] = useState(littleSentence.split())
  const [numCorrect, setNumCorrect] = useState(0)

  const downHandled = (e) => {
    setKeyDown(e.key)
    if(e.key === littleSentence[numCorrect]) {
      setTyped([...typed, e.key])
      const newTyped = littleSentence.slice(numCorrect+ 1, littleSentence.length)
      setNumCorrect(numCorrect + 1)
      setNotTyped(newTyped)
    }
  }

  const turnToText = (file)=> {
    fetch('https://res.cloudinary.com/dbbthq6ra/raw/upload/v1613927137/useTypingCheck_rrttoi.js')
      .then(file=> file.text())
      .then(resultingText=> {
        console.log(resultingText)
        const snippetsArray = resultingText.split('\n')
        console.log(snippetsArray)
        setSnippets(snippetsArray)
        setLittleSentence(snippetsArray[0])
        setEndingNum(snippetsArray[0].length)
        return snippetsArray
      })
      .catch((err)=> {
        console.log(err)
      })
  }


  useEffect(()=> {
    window.addEventListener('keydown', downHandled)
    // cleanup function on unmount
    return ()=> {
    window.removeEventListener('keydown', downHandled)
    }
  })
  useEffect(()=> {
    // updates snippets, littleSentence, and endingNum
    turnToText(reactFile)
  }, [])

  useEffect(()=> {
    if (numCorrect == endingNum) {
      // then we got to the end of the current string
      // reset
      setDoneSnippets([ ...doneSnippets, littleSentence])
      setNumCorrect(0)
      if (snippetIndex + 1 < snippets.length) {
        // update to next snippet if they are there
        setSnippetIndex(snippetIndex + 1)
        setLittleSentence(snippets[snippetIndex+1])
      } else {
        setTyped([])
        setNotTyped([])
        console.log('got through all of them')
      }
    }
  }, [numCorrect, endingNum])

  useEffect(()=> {
    // if littleSentence updates call this
    if (snippets.length > 0) {
      setTyped([])
      setNotTyped(littleSentence.split())
      setEndingNum(snippets[snippetIndex].length)
    }
  }, [littleSentence, setLittleSentence])

  return [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets]

} 
export default useTypingCheck;
