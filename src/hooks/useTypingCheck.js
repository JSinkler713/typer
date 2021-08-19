import {useState, useEffect, useContext} from 'react'; 
import cleanupWhitespace from './cleanupWhitespace';
import handleEmptyLine from './handleEmptyLine';
import cloudinaryUrls from '../data/cloudinaryUrls';

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
  const [keepMoving, setKeepMoving] = useState(false)
  const [totalCorrectChars, setTotalCorrectChars] = useState(0)
  const [totalTypedChars, setTotalTypedChars] = useState(0)

  const downHandled = (e) => {
    setKeyDown(e.key)
    setTotalTypedChars(totalTypedChars + 1)
    if(e.key === littleSentence[numCorrect]) {
      setTotalCorrectChars(totalCorrectChars + 1)
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
    let randomUrlToFetch = cloudinaryUrls[Math.floor(Math.random()*cloudinaryUrls.length)]
    turnToText(randomUrlToFetch)
  }, [])

  useEffect(()=> {
      if (numCorrect == endingNum) {
      // then we got to the end of the current string
      // reset
      // add back in spaces, stored in spaces
      setDoneSnippets([ ...doneSnippets, {littleSentence, spaces}])
      setNumCorrect(0)
      if (snippetIndex + 1 < snippets.length) {
        // update to next snippet 
        console.log('go to next snippet')
        setSnippetIndex(snippetIndex + 1)
      } else {
        setTyped([])
        setNotTyped([])
        setDone(true)
        console.log('got through all of them')
      }
    }
  }, [numCorrect, endingNum, keepMoving])
  
  useEffect(()=> {
    //when the snippet index is increased
    if (snippets[snippetIndex] !== undefined) {
      const itIsEmpty = handleEmptyLine(snippets[snippetIndex])
      if (itIsEmpty) {
        console.log('yup this is empty')
        setNumCorrect(0)
        setEndingNum(0)
        setLittleSentence('')
        setKeepMoving(!keepMoving)
        // need to move to the next line
      } else {
      // clean up beginning spaces for next line
        const [cleanedLine, count] = cleanupWhitespace(snippets[snippetIndex])
        console.log(cleanedLine, count)
        setSpaces(count)
        setLittleSentence(cleanedLine)
      }
    }
  }, [snippetIndex, setSnippetIndex])

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [littleSentence, setLittleSentence])

  return [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets, spaces, done, totalCorrectChars, totalTypedChars]

} 
export default useTypingCheck;
