import {useState, useEffect, useContext} from 'react'; 
import snippets from '../data/snippets.js';
import cleanupWhitespace from './cleanupWhitespace';

console.log(snippets)


const useTypingCheck = ()=> { 
  const [snippets, setSnippets] = useState([])
  const [littleSentence, setLittleSentence] = useState('')
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [doneSnippets, setDoneSnippets] = useState([])

  const [spaces, setSpaces] = useState(0)
  const [keydown, setKeyDown] = useState()
  const [endingNum, setEndingNum] = useState(100)
  const [typed, setTyped] = useState([])
  const [notTyped, setNotTyped] = useState(littleSentence.split())
  const [numCorrect, setNumCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const downHandled = (e) => {
    setKeyDown(e.key)
    if(e.key === littleSentence[numCorrect]) {
      setTyped([...typed, e.key])
      const newTyped = littleSentence.slice(numCorrect+ 1, littleSentence.length)
      setNumCorrect(numCorrect + 1)
      setNotTyped(newTyped)
    }
  }

  const turnToText = (url)=> {
    fetch(url)
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
    //choose random snippet
    let cloudinaryUrls = ['https://res.cloudinary.com/dbbthq6ra/raw/upload/v1614474949/index_rlsl7b.js', 'https://res.cloudinary.com/dbbthq6ra/raw/upload/v1614472075/mapIt_h4hxv2.py', 'https://res.cloudinary.com/dbbthq6ra/raw/upload/v1614474760/ApiFetch_ieyhbb.js', 'https://res.cloudinary.com/dbbthq6ra/raw/upload/v1614474891/todo_laepmu.js']
    let randomUrl = cloudinaryUrls[Math.floor(Math.random()*cloudinaryUrls.length)]
    turnToText(randomUrl)
  }, [])

  useEffect(()=> {
        if (numCorrect == endingNum) {
      // then we got to the end of the current string
      // reset
      // add back in spaces, stored in spaces
      setDoneSnippets([ ...doneSnippets, {littleSentence, spaces}])
      setNumCorrect(0)
      if (snippetIndex + 1 < snippets.length) {
        // update to next snippet if they are there
        setSnippetIndex(snippetIndex + 1)

        //clean up beginning spaces
        const [cleanedLine, count] = cleanupWhitespace(snippets[snippetIndex+1])
          console.log('***********************')
          console.log(cleanedLine, count)
          console.log('***********************')
        setLittleSentence(cleanedLine)
        setSpaces(count)
      } else {
          setTyped([])
          setNotTyped([])
          setDone(true)
          console.log('got through all of them')
      }
    }
  }, [numCorrect, endingNum])

  useEffect(()=> {
    // if littleSentence updates call this
    if (snippets.length > 0) {
        if (spaces) {
          //add extra spaces to front of typed
          let extraSpaces = (' ').repeat(spaces)
          let arrayOfSpaces = extraSpaces.split('')
          setTyped([...arrayOfSpaces])
        } else {
        setTyped([])
        }
      setNotTyped(littleSentence.split())
      setEndingNum(littleSentence.length)
    }
  }, [littleSentence, setLittleSentence])

  return [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets, spaces, done]

} 
export default useTypingCheck;
