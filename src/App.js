import './App.css';
import { useState, useEffect } from 'react'

const littleSentence = 'sequelize db:migrate'
const littleSentenceArray = littleSentence.split('')

function App() {
  const [keydown, setKeyDown] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typed, setTyped] = useState([])
  const [notTyped, setNotTyped] = useState(littleSentenceArray)
  const [numCorrect, setNumCorrect] = useState(0)
  const downHandled = (e) => {
    setKeyDown(e.key)
    if(e.key === littleSentence[currentIndex]) {
      //move to typed
      setTyped( [...typed, e.key])
      //update not typed
      const newTyped = littleSentenceArray.slice(numCorrect+ 1, littleSentenceArray.length)
      setNumCorrect(numCorrect + 1)
      console.log('***********************')
      console.log(newTyped)
      console.log('***********************')
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
      <p class='space'>{notTyped}</p> 
      <p class='space'><span class='nunito'>{typed}</span></p>
      <p class='nunito'>{littleSentence}</p> 
      <p>Hello</p>
    </div>
  );
}

export default App;
