import './App.css';
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import useTypingCheck from './hooks/useTypingCheck';
import Space from './components/Space';
import Timer from './components/Timer';
import Wpm from './components/Wpm';
import ResetButton from './components/ResetButton';
import calcTypingStats from './utils/calcTypingStats';
import calcTop from './utils/calcTop';

const scroller = (ref)=> {
  console.log(ref.current)
  console.log(ref.current.offsetTop)
  window.scrollTo({
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth'
  })
}

const Stats = styled.div`
  border: 2px solid black;
  background: firebrick;
  color: white;
  `



function App() {
  const [keydown, endingNum, typed, notTyped, numCorrect, doneSnippets, spaces, done, totalCorrectChars, totalTypedChars] = useTypingCheck()

  const [startTime, setStartTime] = useState(false)
  const [time, setTime] = useState(0)
  const [wpm, setWpm] = useState('')
  const [percentageCorrect, setPercentageCorrect] = useState('')
  const updateTime = (currTime)=> {
    setTime(currTime)
  }
  const newRef = useRef()

  useEffect(()=> {
    //on first keydown set timer
    console.log('total typed Chars', totalTypedChars)
    if (!startTime && totalTypedChars == 1) {
      setStartTime(true)
    }
  }, [totalTypedChars])

  useEffect(()=> {
    //change when doneSnippets
    scroller(newRef)
    // also show wpm
    const [percentageStat, WPMStat] =   calcTypingStats(totalCorrectChars, totalTypedChars, time)
    setWpm(WPMStat)
    setPercentageCorrect(percentageStat)
  }, [doneSnippets])

  useEffect(()=> {
    if (done) {
      // stop timer
      window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
      })
      console.log('its really done')
    }
  },[done])


  const doneSnippetParagraphs = doneSnippets.map(snippet =>{
    let someSpaces = []
    for (let i=0; i< snippet.spaces; i++) {
      someSpaces.push(<Space />)
    }
    return(
    <p className='done'>
      {someSpaces}
      <span className='space green typed'>{snippet.littleSentence}</span>
    </p>
    )
  })

  // code block already has a space
  let leaders
  if (spaces > 0) {
    leaders = new Array(spaces - 1)
    console.log(leaders)
    leaders.fill(<Space/>)
    console.log(leaders)
  }

  let top = calcTop(doneSnippets.length)


  return (
    <div className="App">
      <div>
        <h1 className='nunito'>Welcome to typer</h1>
        <Timer done={done} updateTime={updateTime} startTime={startTime}/>
        <Stats>
          {
          doneSnippets.length ?
            <>
          <p>{percentageCorrect}</p>
          <p>{wpm}</p>
            </>
          : ''
          }
        </Stats>
        <main className='main-content'>
          <div className='writing-block' style={{ top: top }}>
          { doneSnippets.length ? doneSnippetParagraphs : ''}
          <p className='done' ref={newRef} ><code className='space green typed'>{spaces ? leaders :''}{typed}</code><code className='space red not-typed'>{notTyped}</code></p> 
          </div>
        </main>
          { done ? <ResetButton /> : ''}
      </div>
      <footer>
        JSinkler
      </footer>
    </div>
  );
}

export default App;
