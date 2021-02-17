import {useState, useEffect, useContext} from 'react'; 
import snippets from '../data/snippets.js'

console.log(snippets)
 

const useTypingCheck = ()=> { 
  const [littleSentence, setLittleSentence] = useState(snippets[0].text)
  const [snippetIndex, setSnippetIndex] = useState(0)

  const [keydown, setKeyDown] = useState()
  const [endingNum, setEndingNum] = useState(snippets[0].text.length)
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

  useEffect(()=> {
    window.addEventListener('keydown', downHandled)
    // cleanup function on unmount
    return ()=> {
    window.removeEventListener('keydown', downHandled)
    }
  })

  useEffect(()=> {
    if (numCorrect == endingNum) {
      // then we got to the end of the current string
      // reset
      setNumCorrect(0)
      if (snippetIndex + 1 < snippets.length) {
        // update to next snippet if they are there
        setSnippetIndex(snippetIndex + 1)
        setLittleSentence(snippets[snippetIndex+1].text)
      } else {
        console.log('got through all of them')
      }
    }
  }, [numCorrect])

  useEffect(()=> {
    // if littleSentence updates call this
    setTyped([])
    setNotTyped(littleSentence.split())
    setEndingNum(snippets[snippetIndex].text.length)
  }, [littleSentence, setLittleSentence])

  return [keydown, endingNum, typed, notTyped, numCorrect]

} 
export default useTypingCheck;
