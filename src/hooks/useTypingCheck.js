import {useState, useEffect, useContext} from 'react'; 
 
const littleSentence = `function() { console.log('hello') }`
const littleSentenceArray = littleSentence.split('')

const useTypingCheck = ()=> { 
  const [keydown, setKeyDown] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typed, setTyped] = useState([])
  const [notTyped, setNotTyped] = useState(littleSentenceArray)
  const [numCorrect, setNumCorrect] = useState(0)

  const downHandled = (e) => {
    setKeyDown(e.key)
    if(e.key === littleSentence[currentIndex]) {
      setTyped([...typed, e.key])
      const newTyped = littleSentenceArray.slice(numCorrect+ 1, littleSentenceArray.length)
      setNumCorrect(numCorrect + 1)
      setNotTyped(newTyped)
      setCurrentIndex(currentIndex + 1)
    }
  }

  useEffect(()=> {
    window.addEventListener('keydown', downHandled)
    // cleanup function on unmount
    return ()=> {
    window.removeEventListener('keydown', downHandled)
    }
  })
  return [keydown, currentIndex, typed, notTyped, numCorrect]

} 
export default useTypingCheck;
