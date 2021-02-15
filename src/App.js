import './App.css';
import { useState, useEffect } from 'react'

const littleSentence = 'sequelize db:migrate'
const littleSentenceArray = littleSentence.split('')

function App() {
  const [keydown, setKeyDown] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typed, setTyped] = useState([])
  const [notTyped, setNotTyped] = useState(littleSentenceArray)
  const downHandled = (e) => {
    setKeyDown(e.key)
    if(e.key === littleSentence[currentIndex]) {
      //move to typed
      setTyped( [...typed, e.key])
      //update not typed
      const wasTyped = [...typed]
      const newTyped = wasTyped.slice(1, wasTyped.length - 1)
      setNotTyped(newTyped)
      //increase the index
      setCurrentIndex(currentIndex + 1)

      //move to the next letter
    }
  }
  useEffect(()=> {
      window.addEventListener('keydown', downHandled)
    return ()=> {
      window.removeEventListener('keydown', downHandled)
    }
  })
  return (
    <div className="App">
      <p>Current letter just typed</p>
      <p>{littleSentence}</p> 
      <p>{typed}</p> 
      <p>{keydown}</p>
      <p>Hello</p>
    </div>
  );
}

export default App;
